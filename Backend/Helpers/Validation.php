<?php

function validateImageFile($file) {
    $settings = AppConfig::getImageUploadSettings();

    // ✅ Step 1: Check if file was uploaded and is not empty
    if (
        !isset($file['tmp_name']) || 
        !is_uploaded_file($file['tmp_name']) || 
        $file['error'] !== UPLOAD_ERR_OK ||
        $file['size'] <= 0
    ) {
        Response::error("No valid file uploaded or file is empty.", 400);
    }

    // ✅ Step 2: Read MIME type and file size
    $mime = mime_content_type($file['tmp_name']);
    $size = $file['size'];

    // 🛑 Step 3: Validate MIME type
    if (!in_array($mime, $settings['allowed_types'])) {
        Response::error("Unsupported file type: $mime", 400);
    }

    // 🛑 Step 4: Validate file size
    if ($size < $settings['min_size']) {
        Response::error("File is too small. Minimum allowed size is " . ($settings['min_size'] / 1024) . " KB", 400);
    }

    if ($size > $settings['max_size']) {
        Response::error("File is too large. Maximum allowed size is " . ($settings['max_size'] / 1024 / 1024) . " MB", 400);
    }

    return true;
}
