<?php

function isValidMime($mime) {
    return in_array($mime, ['image/jpeg', 'image/png', 'image/webp']);
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
