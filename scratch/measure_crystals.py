import cv2
import numpy as np

ref = cv2.imread('C:/Users/Pratik/.gemini/antigravity-ide/brain/27d1cc6e-915f-4012-879a-e7de5ca364c4/.user_uploaded/media_1789395635444.jpg')

crops = {
    'web': ref[105:225, 202:305],
    'crypto': ref[95:225, 465:565],
    'pwn': ref[95:225, 725:825],
    'reverse': ref[300:420, 218:310],
    'forensics': ref[300:420, 470:565],
    'osint': ref[300:420, 730:825],
    'misc': ref[495:610, 460:555],
}

for name, patch in crops.items():
    print(f'=== {name} ===')
    for y in range(5, 120, 10):
        # Fire detection: R > 75, R - B > 35
        r = patch[y, :, 2].astype(int)
        g = patch[y, :, 1].astype(int)
        b = patch[y, :, 0].astype(int)
        mask = (r > 75) & ((r - b) > 35) & (g > 25)
        xs = np.where(mask)[0]
        if len(xs) > 0:
            print(f'y={y:2d}: x in [{xs[0]:2d}, {xs[-1]:2d}]')
