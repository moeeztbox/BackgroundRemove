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

function processAndSave($file, callable $effectCallback) {
    // ✅ Step 1: Validate image
    validateImageFile($file);

    // ✅ Step 2: Get config settings
    $settings = AppConfig::getImageUploadSettings();
    $uploadDir = $settings['upload_path'];
    $processedDir = $settings['processed_path'];

    // ✅ Step 3: Prepare file info
    $tmpPath = $file['tmp_name'];
    $mime = mime_content_type($tmpPath);
    $ext = getFileExtensionFromMime($mime);
    $uniqueName = generateUniqueFilename($ext);

    // ✅ Step 4: Set full paths
    $originalPath = "$uploadDir/$uniqueName";
    $processedPath = "$processedDir/$uniqueName";

    // ✅ Step 5: Move original file
    if (!move_uploaded_file($tmpPath, $originalPath)) {
        Response::error('Failed to save uploaded image.', 500);
    }

    // ✅ Step 6: Load image
    $img = loadImageFromPath($originalPath);
    if (!$img) {
        Response::error('Failed to load image for processing.', 500);
    }

    // ✅ Step 7: Apply the custom effect
    $effectCallback($img);

    // ✅ Step 8: Save processed image
    saveImage($img, $processedPath, $mime);
    // add result to variable
    imagedestroy($img);

    $baseUrl = AppConfig::getBaseURL(); // Should end with a slash
    $relativePath = 'Uploads/ProcessedImage/' . $uniqueName;
    $publicUrl = $baseUrl . $relativePath;



    Response::success("Image processed successfully", [
        'imageUrl' => $publicUrl
    ]);

    exit;
}
