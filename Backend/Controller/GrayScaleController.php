<?php

class Controller {
    public function GrayScale() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
        $tmpPath = $_FILES['image']['tmp_name'];
        $mime = mime_content_type($tmpPath);

        if (!isValidMime($mime)) {
            http_response_code(415);
            echo 'Unsupported file type.';
            return;
        }

        $ext = getFileExtensionFromMime($mime);
        $uniqueName = generateUniqueFilename($ext);

        $originalPath = "Uploads/OriginalImage/{$uniqueName}";
        $processedPath = "Uploads/ProcessedImage/{$uniqueName}";

        move_uploaded_file($tmpPath, $originalPath);

        $img = loadImageFromPath($originalPath);
        imagefilter($img, IMG_FILTER_GRAYSCALE);
        saveImage($img, $processedPath, $mime);
        imagedestroy($img);

        header("Content-Type: $mime");
        readfile($processedPath);
    } else {
        http_response_code(400);
        echo 'No image uploaded.';
    }
    }
}
