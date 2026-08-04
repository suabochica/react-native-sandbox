---
name: optimize-images
description: Use when the user asks to compress images, optimize PNGs/JPEGs, convert to WebP, or reduce image file size for web builds.
triggers:
  - "optimize images"
  - "compress image"
  - "convert to webp"
  - "reduce asset bundle size"
---

# Image Optimization Skill

You have access to local environment commands. When triggered, write and run a quick Node.js script using `sharp` or a Python script using `Pillow` to optimize workspace assets.

## Workflow Rules
1. Check if the project uses Node or Python.
2. If Node, ensure `sharp` is available or temporarily run it via `npx`.
3. If Python, look for `Pillow`.
4. Overwrite files in place or save to an optimized folder based on user input.
5. Provide a summary of saved bytes when done.
