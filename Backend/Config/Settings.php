<?php

class AppConfig
{
    public static function setCorsHeaders() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");

        error_reporting(E_ALL);
        ini_set('display_errors', 1);
    }
    public static function getBaseURL() {
    return 'http://localhost/BACKGROUNDREMOVE/Backend/'; // Include trailing slash
}


    public static function getImageUploadSettings() {
    $baseDir = realpath(__DIR__ . '/../'); // go up to BACKGROUNDREMOVE root
    return [
        'allowed_types'   => ['image/jpeg', 'image/png', 'image/webp'],
        'max_size'        => 5 * 1024 * 1024, // 5 MB
        'min_size'        => 5 * 1024,        // 5 KB
        'upload_path'     => "$baseDir/Uploads/OriginalImage",
        'processed_path'  => "$baseDir/Uploads/ProcessedImage"
    ];
}


    // ✅ Create directories if they do not exist
    public static function createDirectories() {
        $settings = self::getImageUploadSettings();

        if (!is_dir($settings['upload_path'])) {
            mkdir($settings['upload_path'], 0777, true);
        }

        if (!is_dir($settings['processed_path'])) {
            mkdir($settings['processed_path'], 0777, true);
        }
    }
}
