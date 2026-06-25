import { useGA, useSettings } from "@/app/providers/AppContext";
import { DrawingCanvas } from "@/features";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";
import downloadCanvas from "@/utils/downloadCanvas";
import { FileDown } from "lucide-react";

interface AiDrawingCardProps {
  width: number;
}

const aiCanvasId = 'ai-canvas';

const AiDrawingCard = ({width}: AiDrawingCardProps) => {
  const { size } = useSettings();
  const { generation, aiPixels } = useGA();

  const downloadAiImage = () => {
    downloadCanvas(aiCanvasId, "ai-image.png");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Drawing</CardTitle>
        <CardDescription>In this canvas you will see result genetic algorithm</CardDescription>
      </CardHeader>
      <CardContent>
        <DrawingCanvas 
          canvasId={aiCanvasId}
          className="mx-auto" 
          width={width} 
          size={size}
          pixels={aiPixels.current} 
          renderTrigger={generation} />
      </CardContent>
      <CardFooter className="h-full">
          <div className="flex">
            <Field>
              <FieldLabel>Actions</FieldLabel>
              <Button variant="outline" onClick={() => downloadAiImage()}>Export image <FileDown /></Button>
            </Field>
          </div>
      </CardFooter>
    </Card>
  )
}

export default AiDrawingCard;