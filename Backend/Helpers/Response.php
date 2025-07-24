<?php

class Response {
    public static function success($message = 'Success', $data = null) {
        http_response_code(200);
        echo json_encode([
            'status' => 200,
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }

    public static function error($message = 'Something went wrong', $statusCode = 400) {
        http_response_code($statusCode);
        echo json_encode([
            'status' => $statusCode,
            'success' => false,
            'message' => $message
        ]);
        exit;
    }
}
