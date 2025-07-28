<?php

class Controller {
   public function GrayScale() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
        $file = $_FILES['image'];

        processWithGD($file, function($img) {
            imagefilter($img, IMG_FILTER_GRAYSCALE);
        });

    } else {
        Response::error('No image uploaded.', 400);
    }
}
 public function BlurBackground() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
            $file = $_FILES['image'];

            processWithGD($file, function($img) {
                for ($i = 0; $i < 40; $i++) {
                    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR);
                }
            });

        } else {
            Response::error('No image uploaded.', 400);
        }
    }
    public function BackgroundRemove() {
          if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
            $file = $_FILES['image'];

            processWithPythonBGRemoval($file);

        } else {
            Response::error('No image uploaded.', 400);
        }
    }

   public function AddBackgroundColor() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'], $_POST['color'])) {
        $file = $_FILES['image'];
        $hexColor = $_POST['color']; // e.g. "#ffffff" or "none"

        if ($hexColor === 'none') {
            // ✅ Just move and return the original image, no processing
            $info = prepareImagePathsAndMove($file);
            copy($info['originalPath'], $info['processedPath']);
            sendSuccessImageResponse($info['uniqueName']);
            return;
        }

        // ✅ Validate hex code
        if (!preg_match('/^#[a-fA-F0-9]{6}$/', $hexColor)) {
            Response::error("Invalid color code. Please use format like #ffffff", 400);
        }

        // ✅ Apply background color using Python
        processWithPythonBackgroundColor($file, $hexColor);

    } else {
        Response::error('No image or color provided.', 400);
    }
}

}

