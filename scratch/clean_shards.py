import cv2
import numpy as np
from PIL import Image

ref = cv2.imread('C:/Users/Pratik/.gemini/antigravity-ide/brain/27d1cc6e-915f-4012-879a-e7de5ca364c4/.user_uploaded/media_1789395635444.jpg')

configs = [
    {
        'name': 'shard-web',
        'crop': (202, 105, 305, 225),
        'excludes': [
            (0, 0, 103, 16),     # Top 'FRAGMENTS'
            (0, 0, 22, 50),      # Top-left '01'
            (0, 92, 45, 120),    # Bottom-left 'surface. Exploit'
            (0, 106, 103, 120),  # Bottom text line
        ]
    },
    {
        'name': 'shard-crypto',
        'crop': (465, 95, 565, 225),
        'excludes': [
            (0, 0, 100, 18),     # Top border line
            (0, 0, 20, 50),      # Left '02'
            (0, 92, 32, 130),    # Bottom-left 'CRYPTO' & 'Decode'
            (0, 115, 100, 130),  # Bottom text
        ]
    },
    {
        'name': 'shard-pwn',
        'crop': (725, 95, 825, 225),
        'excludes': [
            (0, 0, 100, 18),     # Top 'RECLAIM'
            (0, 0, 20, 50),      # Left '03'
            (0, 100, 36, 130),   # Bottom-left 'Take control'
            (0, 115, 100, 130),  # Bottom text
        ]
    },
    {
        'name': 'shard-reverse',
        'crop': (218, 308, 310, 420),
        'excludes': [
            (0, 0, 92, 14),      # Top border line
            (0, 0, 18, 45),      # Left '04'
            (0, 82, 32, 112),    # Bottom-left 'REVERSE' & 'Deconstruct'
            (0, 100, 92, 112),   # Bottom text
        ]
    },
    {
        'name': 'shard-forensics',
        'crop': (472, 308, 565, 420),
        'excludes': [
            (0, 0, 93, 14),      # Top border line
            (0, 0, 18, 45),      # Left '05'
            (0, 78, 28, 112),    # Bottom-left 'SICS' & 'Trace the truth'
            (0, 98, 93, 112),    # Bottom text
        ]
    },
    {
        'name': 'shard-osint',
        'crop': (732, 308, 825, 420),
        'excludes': [
            (0, 0, 93, 12),      # Top border line
            (0, 0, 18, 45),      # Left '06'
            (0, 82, 28, 112),    # Bottom-left 'OSINT' & 'The world'
            (0, 100, 93, 112),   # Bottom text
        ]
    },
    {
        'name': 'shard-misc',
        'crop': (462, 498, 555, 610),
        'excludes': [
            (0, 0, 93, 12),      # Top border line
            (0, 0, 18, 45),      # Left '07'
            (0, 82, 28, 112),    # Bottom-left 'MISC' & 'Expect'
            (0, 98, 93, 112),    # Bottom tags
        ]
    },
]

for item in configs:
    x1, y1, x2, y2 = item['crop']
    patch = ref[y1:y2, x1:x2].copy()
    h, w = patch.shape[:2]
    
    # Zero out all excludes
    for ex1, ey1, ex2, ey2 in item['excludes']:
        ex1, ey1 = max(0, ex1), max(0, ey1)
        ex2, ey2 = min(w, ex2), min(h, ey2)
        patch[ey1:ey2, ex1:ex2] = 0
    
    # Inpaint or smooth edges of excluded zones so there are no harsh cuts
    # Alpha mask based on luminous orange fire
    r = patch[:, :, 2].astype(float)
    g = patch[:, :, 1].astype(float)
    b = patch[:, :, 0].astype(float)
    
    # Color calculations
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    orange_boost = np.clip((r - b) / 255.0, 0, 1.0)
    
    # Alpha calculation
    alpha = np.clip((lum - 14.0) / 40.0, 0.0, 1.0)
    alpha = np.maximum(alpha, np.clip(orange_boost * 1.6 - 0.15, 0.0, 1.0))
    alpha = (alpha * 255).astype(np.uint8)
    
    # Feather alpha with Gaussian blur
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0.8)
    
    # Combine RGBA
    rgba = np.dstack([patch, alpha])
    
    # Upscale 2.5x with LANCZOS
    pil_img = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
    target_w = int(w * 2.5)
    target_h = int(h * 2.5)
    pil_img = pil_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    out_path = 'public/assets/shards/' + item['name'] + '.png'
    pil_img.save(out_path, optimize=True)
    print('Cleaned and saved:', out_path, pil_img.size)

print('All 7 shards cleaned successfully!')
