const downloadCanvas = (canvasId: string, filename: string) => {
    const canvas = document.getElementById(canvasId);

    if(!canvas)
      return;

    const image = (canvas as HTMLCanvasElement).toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");

    const link = document.createElement('a');
    link.download = filename || 'image.png';
    link.href = image;

    link.click();
}

export default downloadCanvas;