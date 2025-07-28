from rembg import remove
import sys
from PIL import Image
import io

def remove_background(input_path, output_path):
    with open(input_path, 'rb') as input_file:
        input_data = input_file.read()
        output_data = remove(input_data)
        with open(output_path, 'wb') as output_file:
            output_file.write(output_data)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python remove_bg.py input_path output_path")
    else:
        remove_background(sys.argv[1], sys.argv[2])
