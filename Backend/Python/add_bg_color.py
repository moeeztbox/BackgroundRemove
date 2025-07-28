import sys
from PIL import Image

def add_background_color(input_path, output_path, hex_color):
    try:
        # Open the input image (should be PNG with transparency)
        image = Image.open(input_path).convert("RGBA")

        # Create a new background with the same size and the given color
        background = Image.new("RGBA", image.size, hex_color)

        # Composite the original image over the background
        final_image = Image.alpha_composite(background, image)

        # Save as PNG to preserve quality
        final_image.save(output_path, format="PNG")

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python add_bg_color.py input.png output.png #RRGGBB")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]
    hex_color = sys.argv[3]

    add_background_color(input_path, output_path, hex_color)
