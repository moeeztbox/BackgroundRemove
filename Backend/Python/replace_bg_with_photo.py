# Backend/Python/replace_bg_with_photo.py

from PIL import Image
import sys
import os

def replace_background(fg_path, bg_path, output_path):
    try:
        # Open the foreground (original transparent image)
        foreground = Image.open(fg_path).convert("RGBA")

        # Open the background and resize to match foreground
        background = Image.open(bg_path).convert("RGBA").resize(foreground.size)

        # Composite both images
        combined = Image.alpha_composite(background, foreground)

        # Save the result
        combined.save(output_path)

        print("Success: Background replaced.")

    except Exception as e:
        print("Error:", str(e))

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python replace_bg_with_photo.py foreground.png background.jpg output.png")
    else:
        fg_path = sys.argv[1]
        bg_path = sys.argv[2]
        output_path = sys.argv[3]

        replace_background(fg_path, bg_path, output_path)
