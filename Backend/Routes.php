<?php
require_once 'Config/Settings.php';
require_once 'Helpers/ImageUtils.php';
require_once 'Helpers/FileUtils.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'grayscale':
        require 'Effects/GrayScale.php';
        break;

    default:
        http_response_code(400);
        echo 'Invalid action.';
}
