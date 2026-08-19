from PIL import Image
import os

assets_dir = 'src/assets'
images = [f for f in os.listdir(assets_dir) if f.endswith('.png') or f.endswith('.jpg')]

for img_name in images:
    path = os.path.join(assets_dir, img_name)
    with Image.open(path) as img:
        print(f"{img_name}: {img.size} ({img.mode})")
