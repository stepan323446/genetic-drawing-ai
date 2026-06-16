import { useGA, useSettings } from "@/app/providers/AppContext";
import { DrawingCanvas } from "@/features";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";

interface AiDrawingCardProps {
  width: number;
}

const AiDrawingCard = ({width}: AiDrawingCardProps) => {
  const { size } = useSettings();
  const { generation, aiPixels } = useGA();


  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Drawing</CardTitle>
        <CardDescription>In this canvas you will see result genetic algorithm</CardDescription>
      </CardHeader>
      <CardContent>
        <DrawingCanvas 
          className="mx-auto" 
          width={width} 
          size={size}
          pixels={aiPixels.current} 
          renderTrigger={generation} />
      </CardContent>
      <CardFooter>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Field>
              <FieldLabel>Mode</FieldLabel>

            </Field>
          </div>
      </CardFooter>
    </Card>
  )
}

export default AiDrawingCard;