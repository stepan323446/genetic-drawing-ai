import { Card } from "@/shadcn/components/ui/card"
import { useEffect, useRef } from "react";

interface DrawingCanvasProps {
  width: number
  size: number
  pixels: Uint8Array
  renderTrigger?: unknown
  className?: string
  onPaint?: (x: number, y: number) => void
}

const DrawingCanvas = ({ className, width, size, pixels, renderTrigger, onPaint }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false);

  const render = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.createImageData(width, width)
    const data = imageData.data;

    // Draw ImageData
    for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const v = pixels[py * size + px]

      const x0 = Math.round(px * width / size)
      const x1 = Math.round((px + 1) * width / size)
      const y0 = Math.round(py * width / size)
      const y1 = Math.round((py + 1) * width / size)

      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * width + x) * 4
          data[i] = data[i+1] = data[i+2] = v
          data[i+3] = 255
        }
      }
    }
  }

    ctx.putImageData(imageData, 0, 0);
  }

  useEffect(() => {
    render();    

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, size, renderTrigger]);

  const getCoords = (e: React.MouseEvent<HTMLCanvasElement>): [number, number] => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) * size / width)
    const y = Math.floor((e.clientY - rect.top) * size / width)
    return [
      Math.max(0, Math.min(size - 1, x)),
      Math.max(0, Math.min(size - 1, y)),
    ]
  }

  const handlePaint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onPaint) return
    const [x, y] = getCoords(e);
    onPaint(x, y);
  }

  return (
    <Card style={{width: `${width}px`}} className={className}>
      <canvas 
        ref={canvasRef} 
        width={width} height={width}
        onMouseDown={e => { isDrawing.current = true; handlePaint(e) }}
        onMouseMove={e => { if (!isDrawing.current) return; handlePaint(e) }}
        onMouseUp={() => { isDrawing.current = false }}
        onMouseLeave={() => { isDrawing.current = false }}
        ></canvas>
    </Card>
  )
}

export default DrawingCanvas;