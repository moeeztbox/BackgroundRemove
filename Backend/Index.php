<?php
require_once 'Config/Settings.php';       
require_once 'Helpers/FileUtils.php'; 
require_once 'Helpers/ImageUtils.php';         
require_once 'Controller/GrayScaleController.php';            
require_once 'Routes/Routes.php';         

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

handleRequest($method, $action);
