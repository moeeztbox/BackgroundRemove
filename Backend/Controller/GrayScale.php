<?php

class Controller {
   public function GrayScale() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
        $file = $_FILES['image'];

        processAndSave($file, function($img) {
            imagefilter($img, IMG_FILTER_GRAYSCALE);
        });

    } else {
        Response::error('No image uploaded.', 400);
    }
}
}
