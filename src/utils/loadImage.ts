const loadImage = (file: File, size: number): Promise<Uint8Array> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')!

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, size, size)

      // Convert image sizes to canvas
      const changeHeight = size * 1 / img.height;
      ctx.drawImage(img, 0, 0, changeHeight * img.width, size)

      // Read pixels
      const imageData = ctx.getImageData(0, 0, size, size)
      const data = imageData.data  // RGBA

      // Convert to grayscale
      const pixels = new Uint8Array(size * size)
      for (let i = 0; i < size * size; i++) {
        const r = data[i * 4]
        const g = data[i * 4 + 1]
        const b = data[i * 4 + 2]
        // luminance
        pixels[i] = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
      }

      URL.revokeObjectURL(img.src)
      resolve(pixels)
    }
    img.src = URL.createObjectURL(file)
  })
}

export default loadImage