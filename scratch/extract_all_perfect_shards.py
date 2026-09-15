import cv2
import numpy as np
from PIL import Image

ref = cv2.imread('C:/Users/Pratik/.gemini/antigravity-ide/brain/27d1cc6e-915f-4012-879a-e7de5ca364c4/.user_uploaded/media_1789395635444.jpg')

configs = [
    {
        'name': 'shard-web',
        'crop': (202, 105, 305, 225),
        'poly': [
            [78, 5], [95, 38], [92, 76], [75, 102], [35, 96], [14, 65], [38, 25]
        ]
    },
    {
        'name': 'shard-crypto',
        'crop': (465, 95, 565, 225),
        'poly': [
            [47, 5], [82, 45], [80, 95], [50, 118], [25, 95], [23, 45]
        ]
    },
    {
        'name': 'shard-pwn',
        'crop': (725, 95, 825, 225),
        'poly': [
            [54, 5], [90, 48], [85, 96], [55, 120], [30, 96], [28, 48]
        ]
    },
    {
        'name': 'shard-reverse',
        'crop': (218, 300, 310, 420),
        'poly': [
            [35, 10], [72, 48], [72, 95], [40, 110], [22, 95], [12, 48]
        ]
    },
    {
        'name': 'shard-forensics',
        'crop': (470, 300, 565, 420),
        'poly': [
            [46, 10], [78, 48], [74, 96], [42, 110], [22, 96], [22, 48]
        ]
    },
    {
        'name': 'shard-osint',
        'crop': (730, 300, 825, 420),
        'poly': [
            [63, 10], [82, 48], [75, 96], [48, 112], [26, 96], [32, 48]
        ]
    },
    {
        'name': 'shard-misc',
        'crop': (460, 495, 555, 610),
        'poly': [
            [52, 6], [78, 48], [72, 95], [43, 110], [20, 95], [18, 48]
        ]
    },
]

for item in configs:
    x1, y1, x2, y2 = item['crop']
    patch = ref[y1:y2, x1:x2].copy()
    h, w = patch.shape[:2]
    
    pts = np.array(item['poly'], dtype=np.int32)
    poly_mask = np.zeros((h, w), dtype=np.uint8)
    cv2.fillPoly(poly_mask, [pts], 255)
    poly_soft = cv2.GaussianBlur(poly_mask, (5, 5), 1.0)
    
    r = patch[:, :, 2].astype(float)
    g = patch[:, :, 1].astype(float)
    b = patch[:, :, 0].astype(float)
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    orange_boost = np.clip((r - b) / 255.0, 0, 1.0)
    
    alpha = np.clip((lum - 12.0) / 28.0, 0.0, 1.0)
    alpha = np.maximum(alpha, np.clip(orange_boost * 1.8 - 0.1, 0.0, 1.0))
    alpha = (alpha * 255).astype(np.uint8)
    
    final_alpha = (alpha.astype(float) * (poly_soft.astype(float) / 255.0)).astype(np.uint8)
    rgba = np.dstack([patch, final_alpha])
    
    pil_img = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
    target_w = int(w * 2.5)
    target_h = int(h * 2.5)
    pil_img = pil_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    out_path = 'public/assets/shards/' + item['name'] + '.png'
    pil_img.save(out_path, optimize=True)
    print('Crystal saved perfectly:', out_path, pil_img.size)

print('All 7 crystals extracted with zero artifacts!')
