const fs = require('fs');

async function removeBackground() {
  const Jimp = (await import('jimp')).default || await import('jimp');
  
  const imagePath = './assets/images/intro_illustration.png';
  const outputPath = './assets/images/intro_illustration.png'; // Will overwrite directly
  
  try {
    const image = await Jimp.read(imagePath);
    
    // The background is likely white or off-white. We'll find all pixels close to white and make them transparent.
    // However, the characters also have colors. We should flood-fill from the top-left corner (0,0).
    // Jimp doesn't have a built-in flood fill to transparent, so let's do a simple threshold for very light colors 
    // or implement a basic BFS flood fill.
    
    const targetColor = image.getPixelColor(0, 0); // Get background color from top-left
    const targetRGBA = Jimp.intToRGBA(targetColor);
    
    // BFS to find connected background pixels
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    const visited = new Uint8Array(width * height);
    const queue = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]]; // Start from all 4 corners
    
    for (const [startX, startY] of queue) {
      visited[startY * width + startX] = 1;
    }
    
    let head = 0;
    
    const colorDistance = (c1, c2) => {
      return Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b);
    };
    
    while (head < queue.length) {
      const [x, y] = queue[head++];
      
      const pixelColor = Jimp.intToRGBA(image.getPixelColor(x, y));
      
      // If color is close to the target background color (white/off-white)
      if (colorDistance(pixelColor, targetRGBA) < 90) { // Increased Tolerance to 90 for gradients and shadows
        // Make it perfectly transparent
        image.setPixelColor(0x00000000, x, y);
        
        // Add neighbors
        const neighbors = [
          [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
        ];
        
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const idx = ny * width + nx;
            if (!visited[idx]) {
              visited[idx] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
    
    await image.writeAsync(outputPath);
    console.log("Background removed successfully!");
    
  } catch (e) {
    console.error("Error removing background:", e);
  }
}

removeBackground();
