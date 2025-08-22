<?php
function generateUniqueFilename($extension = 'jpg') {
    return uniqid('img_', true) . '.' . $extension;
}

function getFileExtensionFromMime($mime) {
    return match ($mime) {
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        default      => 'jpg',
    };
}

function loadImageFromPath($path) {
    $mime = mime_content_type($path);
    return match ($mime) {
        'image/jpeg' => imagecreatefromjpeg($path),
        'image/png'  => imagecreatefrompng($path),
        'image/webp' => imagecreatefromwebp($path),
        default      => false,
    };
}

function saveImage($image, $path, $mime) {
    return match ($mime) {
        'image/jpeg' => imagejpeg($image, $path),
        'image/png'  => imagepng($image, $path),
        'image/webp' => imagewebp($image, $path),
        default      => false,
    };
}

// ✅ NEW: Move uploaded image and prepare file info
function prepareImagePathsAndMove($file) {
    validateImageFile($file);

    $settings = AppConfig::getImageUploadSettings();
    $uploadDir = $settings['upload_path'];
    $processedDir = $settings['processed_path'];

    $tmpPath = $file['tmp_name'];
    $mime = mime_content_type($tmpPath);
    $ext = getFileExtensionFromMime($mime);
    $uniqueName = generateUniqueFilename($ext);

    $originalPath = "$uploadDir/$uniqueName";
    $processedPath = "$processedDir/$uniqueName";

    if (!move_uploaded_file($tmpPath, $originalPath)) {
        Response::error('Failed to save uploaded image.', 500);
    }

    return [
        'originalPath' => $originalPath,
        'processedPath' => $processedPath,
        'mime' => $mime,
        'uniqueName' => $uniqueName
    ];
}

// ✅ NEW: Send the success response with the image URL
function sendSuccessImageResponse($uniqueName) {
    $baseUrl = AppConfig::getBaseURL();
    $relativePath = 'Uploads/ProcessedImage/' . $uniqueName;
    $publicUrl = $baseUrl . $relativePath;

    Response::success("Image processed successfully", [
        'imageUrl' => $publicUrl
    ]);
}

// ✅ CLEANED: GD-based processing wrapper
// function processWithGD($file, callable $effectCallback) {
//     $info = prepareImagePathsAndMove($file);
//     $img = loadImageFromPath($info['originalPath']);

//     if (!$img) {
//         Response::error('Failed to load image for processing.', 500);
//     }

//     $effectCallback($img);

//     saveImage($img, $info['processedPath'], $info['mime']);
//     imagedestroy($img);

//     sendSuccessImageResponse($info['uniqueName']);
//     exit;
// }
function processWithGD($file, callable $effectCallback) {
    $info = prepareImagePathsAndMove($file);
    $img = loadImageFromPath($info['originalPath']);

    if (!$img) {
        Response::error('Failed to load image for processing.', 500);
    }

    // 🛡️ Preserve alpha transparency if PNG
    if ($info['mime'] === 'image/png') {
        imagealphablending($img, false);   // allow transparency writing
        imagesavealpha($img, true);        // keep alpha on save
    }

    // 🎨 Apply effect (e.g., grayscale)
    $effectCallback($img);

    saveImage($img, $info['processedPath'], $info['mime']);
    imagedestroy($img);

    sendSuccessImageResponse($info['uniqueName']);
    exit;
}

function processWithPythonBlur($file) {
    $info = prepareImagePathsAndMove($file);

    $pythonScriptPath = __DIR__ . '/../Python/blur_image.py';
    $inputPath = escapeshellarg($info['originalPath']);
    $outputPath = escapeshellarg($info['processedPath']);

    $command = "python $pythonScriptPath $inputPath $outputPath 2>&1";
    $output = shell_exec($command);

    if (!file_exists($info['processedPath'])) {
        Response::error("Image blur failed. Python output: $output", 500);
    }

    sendSuccessImageResponse($info['uniqueName']);
    exit;
}
function processWithPythonBlurBackgroundLevel($file, $blurStrength) {
   $info = prepareImagePathsAndMove($file);

// Force output path to .png
$processedPath = str_replace('.jpg', '.png', $info['processedPath']);
$processedPath = str_replace('.jpeg', '.png', $processedPath);

$pythonScriptPath = __DIR__ . '/../Python/blur_background_only.py';
$inputPath = escapeshellarg($info['originalPath']);
$outputPath = escapeshellarg($processedPath);
$strength = escapeshellarg($blurStrength + 1);

$command = "python $pythonScriptPath $inputPath $outputPath $strength 2>&1";
$output = shell_exec($command);

if (!file_exists($processedPath)) {
    Response::error("Background blur failed. Python output: $output", 500);
}

// Important: replace $info['processedPath'] with updated $processedPath
$info['processedPath'] = $processedPath;
sendSuccessImageResponse(basename($processedPath));

    exit;
}


// function processWithPythonBGRemoval($file) {
//     $info = prepareImagePathsAndMove($file);

//     $pythonScriptPath = __DIR__ . '/../Python/remove_bg.py';
//     $inputPath = escapeshellarg($info['originalPath']);
//     $outputPath = escapeshellarg($info['processedPath']);

//     $command = "python $pythonScriptPath $inputPath $outputPath 2>&1";
//     $output = shell_exec($command); 
  
//     if (!file_exists($info['processedPath'])) {
//         Response::error("Background removal failed. Python output: $output", 500);
//     }

//     sendSuccessImageResponse($info['uniqueName']);
//     exit;
// }
function processWithPythonBGRemoval($file) {
    $info = prepareImagePathsAndMove($file);

    // Force PNG extension for transparency support
    $processedPath = preg_replace('/\.(jpg|jpeg)$/i', '.png', $info['processedPath']);
    $pythonScriptPath = __DIR__ . '/../Python/remove_bg.py';

    $inputPath = escapeshellarg($info['originalPath']);
    $outputPath = escapeshellarg($processedPath);

    $command = "python $pythonScriptPath $inputPath $outputPath 2>&1";
    $output = shell_exec($command);

    if (!file_exists($processedPath)) {
        Response::error("Background removal failed. Python output: $output", 500);
    }

    sendSuccessImageResponse(basename($processedPath));
    exit;
}

function processWithPythonBackgroundColor($file, $hexColor) {
    $info = prepareImagePathsAndMove($file);

    $pythonScriptPath = __DIR__ . '/../Python/add_bg_color.py';
    $inputPath = escapeshellarg($info['originalPath']);
    $outputPath = escapeshellarg($info['processedPath']);
    $color = escapeshellarg($hexColor);

    $command = "python $pythonScriptPath $inputPath $outputPath $color 2>&1";
    $output = shell_exec($command);

    if (!file_exists($info['processedPath'])) {
        Response::error("Background color application failed. Python output: $output", 500);
    }

    sendSuccessImageResponse($info['uniqueName']);
    exit;
}
function processWithPythonBackgroundPhoto($fgFile, $bgFile) {
    // Move and get paths
    $fgInfo = prepareImagePathsAndMove($fgFile);
    $bgInfo = prepareImagePathsAndMove($bgFile);

    $pythonScriptPath = __DIR__ . '/../Python/replace_bg_with_photo.py';
    $inputFG = escapeshellarg($fgInfo['originalPath']);
    $inputBG = escapeshellarg($bgInfo['originalPath']);
    $output = escapeshellarg($fgInfo['processedPath']);

    $command = "python $pythonScriptPath $inputFG $inputBG $output 2>&1";
    $result = shell_exec($command);

    if (!file_exists($fgInfo['processedPath'])) {
        Response::error("Background photo replacement failed. Python output: $result", 500);
    }

    sendSuccessImageResponse($fgInfo['uniqueName']);
    exit;
}




