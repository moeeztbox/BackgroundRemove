import sys
import io
from PIL import Image, ImageFilter
from rembg import remove

if len(sys.argv) != 4:
    print("Usage: python blur_background_only.py input.png output.png blur_strength")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]
blur_strength = int(sys.argv[3])

# 🟢 Load original image in RGBA (preserve transparency!)
original = Image.open(input_path).convert("RGBA")

# 🟢 Remove background (preserves transparency)
with open(input_path, 'rb') as i:
    fg = remove(i.read())
foreground = Image.open(io.BytesIO(fg)).convert("RGBA")

# 🔵 Extract alpha from foreground
alpha_mask = foreground.split()[-1]

# 🔵 Blur the original background
blurred_bg = original.filter(ImageFilter.GaussianBlur(blur_strength)).convert("RGBA")

# 🟣 Composite: Paste foreground only where it's opaque
final = Image.composite(foreground, blurred_bg, alpha_mask)

# ✅ Save as PNG to preserve transparency
final.save(output_path, "PNG")

print(f"✅ Saved without black background: {output_path}")
