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
        processWithPythonBlur($file); // 🔁 Changed from GD to Python
    } else {
        Response::error('No image uploaded.', 400);
    }
}
public function BlurBackgroundLevel() {
  if ($_SERVER['REQUEST_METHOD'] === 'POST'
      && isset($_FILES['image'], $_POST['blur_strength'])) {
    $file = $_FILES['image'];
    $blurStrength = intval($_POST['blur_strength']);
    if ($blurStrength < 0 || $blurStrength > 100) {
      Response::error('Blur strength must be between 0 and 100.', 400);
    }
    processWithPythonBlurBackgroundLevel($file, $blurStrength);
  } else {
    Response::error('Image or blur strength missing.', 400);
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
public function AddBackgroundPhoto() {
   if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $fgFile = $_FILES['image'];

    if (isset($_FILES['background'])) {
        $bgFile = $_FILES['background'];
        processWithPythonBackgroundPhoto($fgFile, $bgFile);
    } else {
        // No background selected, return original image (or apply fallback)
        $fgInfo = prepareImagePathsAndMove($fgFile);
        copy($fgInfo['originalPath'], $fgInfo['processedPath']);
        sendSuccessImageResponse($fgInfo['uniqueName']);
    }

    } else {
        Response::error('Both image and background photo must be uploaded.', 400);
    }
}


}

