from rembg import remove
from PIL import Image
import io
import os

input_path = "C:/Users/kadar/.gemini/antigravity/brain/f6b9b2d3-0798-4885-895f-29129cb93a5c/uploaded_image_1769291723159.jpg"
output_path = "c:/Users/kadar/OneDrive/Desktop/PORTFOLIO APP/adarsh-ai-portfolio/apps/web/public/hero-person.png"

print(f"Processing {input_path}...")

try:
    with open(input_path, 'rb') as i:
        input_data = i.read()
        output_data = remove(input_data)
        
    with open(output_path, 'wb') as o:
        o.write(output_data)
        
    print(f"Success! Saved to {output_path}")
except Exception as e:
    print(f"Error: {e}")
