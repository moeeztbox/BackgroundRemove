import cv2
import sys
import os

# ----------------------------
# USAGE:
# python blur_image.py input.jpg output.jpg
# ----------------------------

# Check if correct number of arguments provided
if len(sys.argv) != 3:
    print("Usage: python blur_image.py input.jpg output.jpg")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]

# Check if file exists
if not os.path.exists(input_path):
    print(f"Error: File not found - {input_path}")
    sys.exit(1)

# Read the image
image = cv2.imread(input_path)

# Apply Gaussian Blur
blurred = cv2.GaussianBlur(image, (81, 81), 0)  # (31, 31) = kernel size

# Save the blurred image
cv2.imwrite(output_path, blurred)

print(f"✅ Image blurred and saved as: {output_path}")
