<?php

function handleRequest($method, $action) {
    $controller = new Controller();

    if ($method === 'POST') {
        switch ($action) {
            case 'grayscale':
                $controller->GrayScale();
                break;
            default:
                http_response_code(400);
                echo 'Invalid action.';
                break;
        }
    } else {
        http_response_code(405);
        echo 'Only POST requests are allowed.';
    }
}
