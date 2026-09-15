import cv2
import numpy as np
from PIL import Image

ref = cv2.imread('C:/Users/Pratik/.gemini/antigravity-ide/brain/27d1cc6e-915f-4012-879a-e7de5ca364c4/.user_uploaded/media_1789395635444.jpg')

# Precise facet polygons directly tracing crystal edges:
configs = [
    {
        'name': 'shard-web',
        'crop': (202, 105, 305, 225),
        'poly': [
            [63, 6], [96, 38], [93, 78], [78, 106], [48, 106], [32, 100], [12, 65]
        ]
    },
    {
        'name': 'shard-crypto',
        'crop': (465, 95, 565, 225),
        'poly': [
            [38, 5], [82, 50], [76, 114], [45, 116], [24, 108], [6, 54]
        ]
    },
    {
        'name': 'shard-pwn',
        'crop': (725, 95, 825, 225),
        'poly': [
            [38, 5], [85, 52], [78, 112], [42, 116], [22, 105], [8, 52]
        ]
    },
    {
        'name': 'shard-reverse',
        'crop': (218, 300, 310, 420),
        'poly': [
            [40, 10], [75, 50], [68, 108], [40, 112], [22, 98], [7, 50]
        ]
    },
    {
        'name': 'shard-forensics',
        'crop': (470, 300, 565, 420),
        'poly': [
            [41, 10], [80, 48], [74, 106], [42, 112], [22, 98], [8, 48]
        ]
    },
    {
        'name': 'shard-osint',
        'crop': (730, 300, 825, 420),
        'poly': [
            [41, 10], [78, 48], [70, 106], [42, 112], [22, 98], [10, 48]
        ]
    },
    {
        'name': 'shard-misc',
        'crop': (460, 495, 555, 610),
        'poly': [
            [43, 8], [78, 50], [70, 106], [43, 110], [20, 96], [8, 50]
        ]
    },
]

for item in configs:
    x1, y1, x2, y2 = item['crop']
    patch = ref[y1:y2, x1:x2].copy()
    h, w = patch.shape[:2]
    
    # Polygon mask directly tracing the facet edges
    pts = np.array(item['poly'], dtype=np.int32)
    poly_mask = np.zeros((h, w), dtype=np.uint8)
    cv2.fillPoly(poly_mask, [pts], 255)
    
    # Soften polygon boundary
    poly_soft = cv2.GaussianBlur(poly_mask, (5, 5), 1.0)
    
    # Luminance & orange chrominance
    r = patch[:, :, 2].astype(float)
    g = patch[:, :, 1].astype(float)
    b = patch[:, :, 0].astype(float)
    
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    orange_boost = np.clip((r - b) / 255.0, 0, 1.0)
    
    # Alpha threshold
    alpha = np.clip((lum - 12.0) / 30.0, 0.0, 1.0)
    alpha = np.maximum(alpha, np.clip(orange_boost * 1.8 - 0.1, 0.0, 1.0))
    alpha = (alpha * 255).astype(np.uint8)
    
    # Combine with polygon mask
    final_alpha = (alpha.astype(float) * (poly_soft.astype(float) / 255.0)).astype(np.uint8)
    
    # Create RGBA
    rgba = np.dstack([patch, final_alpha])
    
    # Resize 2.5x with LANCZOS
    pil_img = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
    target_w = int(w * 2.5)
    target_h = int(h * 2.5)
    pil_img = pil_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    out_path = 'public/assets/shards/' + item['name'] + '.png'
    pil_img.save(out_path, optimize=True)
    print('Crystal saved:', out_path, pil_img.size)

print('All 7 crystals extracted cleanly!')
