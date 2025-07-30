import sys
import io
from PIL import Image, ImageFilter
from rembg import remove

if len(sys.argv) != 4:
    print("Usage: python blur_background_only.py input.jpg output.jpg blur_strength")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]
blur_strength = int(sys.argv[3])

# Step 1: Load original image
original = Image.open(input_path).convert("RGB")

# Step 2: Create foreground with transparent background
with open(input_path, 'rb') as i:
    fg = remove(i.read())
foreground = Image.open(io.BytesIO(fg)).convert("RGBA")

# Step 3: Blur the original background
blurred_bg = original.filter(ImageFilter.GaussianBlur(blur_strength)).convert("RGBA")

# Step 4: Composite foreground over blurred background using alpha mask
final = Image.alpha_composite(blurred_bg, foreground)

# Step 5: Save the output
final.convert("RGB").save(output_path, "JPEG")

print(f"Saved: {output_path}")
