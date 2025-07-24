<?php

function handleRequest($method, $action) {
    try {
        $controller = new Controller();

        if ($method === 'POST') {
            switch ($action) {
                case 'grayscale':
                    $controller->GrayScale();
                    break;
                default:
                    Response::error('Invalid action.', 400);
                    break;
            }
        } else {
            Response::error('Only POST requests are allowed.', 400);
        }
    } catch (Exception $e) {
        Response::error('Server error: ' . $e->getMessage(), 500);
    }
}
