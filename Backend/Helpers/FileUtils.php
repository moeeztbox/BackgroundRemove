<?php

function generateUniqueFilename($extension = 'jpg') {
    return uniqid('img_', true) . '.' . $extension;
}
