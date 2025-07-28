<?php
require_once 'Config/Settings.php'; 
require_once 'Controller/Controller.php';            
require_once 'Helpers/Response.php';
require_once 'Helpers/Validation.php';
require_once 'Routes/Routes.php';         
require_once 'Services/Services.php';

AppConfig::setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

handleRequest($method, $action);

