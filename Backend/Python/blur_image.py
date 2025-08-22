# import cv2
# import sys
# import os

# # ----------------------------
# # USAGE:
# # python blur_image.py input.jpg output.jpg
# # ----------------------------

# # Check if correct number of arguments provided
# if len(sys.argv) != 3:
#     print("Usage: python blur_image.py input.jpg output.jpg")
#     sys.exit(1)

# input_path = sys.argv[1]
# output_path = sys.argv[2]

# # Check if file exists
# if not os.path.exists(input_path):
#     print(f"Error: File not found - {input_path}")
#     sys.exit(1)

# # Read the image
# image = cv2.imread(input_path)

# # Apply Gaussian Blur
# blurred = cv2.GaussianBlur(image, (81, 81), 0)  # (31, 31) = kernel size

# # Save the blurred image
# cv2.imwrite(output_path, blurred)

# print(f"✅ Image blurred and saved as: {output_path}")

import cv2
import sys
import os
import numpy as np

if len(sys.argv) != 3:
    print("Usage: python blur_image.py input.png output.png")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]

if not os.path.exists(input_path):
    print(f"Error: File not found - {input_path}")
    sys.exit(1)

# Read image with alpha channel
image = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)

# Check if image has alpha channel
if image.shape[2] == 4:
    # Split channels
    b, g, r, a = cv2.split(image)

    # Merge RGB and blur it
    rgb = cv2.merge((b, g, r))
    blurred_rgb = cv2.GaussianBlur(rgb, (81, 81), 0)

    # Split blurred back and merge with original alpha
    b_blur, g_blur, r_blur = cv2.split(blurred_rgb)
    result = cv2.merge((b_blur, g_blur, r_blur, a))
else:
    # No alpha channel, just blur as usual
    result = cv2.GaussianBlur(image, (81, 81), 0)

# Save the final image with alpha preserved
cv2.imwrite(output_path, result)
print(f"✅ Image blurred and saved as: {output_path}")
