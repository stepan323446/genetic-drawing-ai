import { useGA, useSettings, useActions } from "@/app/providers/AppContext";
import { DrawingCanvas } from "@/features";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";
import { Slider } from "@/shadcn/components/ui/slider";
import loadImage from "@/utils/loadImage";
import { Image as ImageIcon } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

interface UserDrawingProps {
  width: number;
}

const UserDrawingCard = ({width}: UserDrawingProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [ grayscale, setGrayscale ] = useState(0);
  const [ brushSize, setBrushSize ] = useState(1);
  const { size } = useSettings();
  const { status } = useActions();
  const { userPixels, modifyUserPixel, userCanvasTrigger, resetPixels, updateUserTrigger } = useGA();

  const isActiveForm = status == 'init';

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const pixels = await loadImage(file, size)
    userPixels.current.set(pixels);
    e.target.value = '';
    updateUserTrigger();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your drawing</CardTitle>
        <CardDescription>Draw anything on this canvas</CardDescription>
      </CardHeader>
      <CardContent>
        <DrawingCanvas 
          className="mx-auto" 
          width={width} 
          size={size}
          pixels={userPixels.current} 
          renderTrigger={userCanvasTrigger}
          onPaint={(x, y) => {
            if(status != 'init')
              return;
            
            modifyUserPixel(x, y, grayscale, brushSize);
          }} />
      </CardContent>
      <CardFooter>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <Field className="mb-4">
                <FieldLabel>Grayscale ({grayscale})</FieldLabel>
                <Slider
                  defaultValue={[grayscale]}
                  max={255}
                  step={1}
                  onValueChange={(val) => setGrayscale(val[0])}
                  className="w-full max-w-xs"
                  disabled={!isActiveForm}
                />
              </Field>
              <Field>
                <FieldLabel>Size ({brushSize})</FieldLabel>
                <Slider
                  defaultValue={[brushSize]}
                  max={10}
                  min={1}
                  step={1}
                  onValueChange={(val) => setBrushSize(val[0])}
                  className="w-full max-w-xs"
                  disabled={!isActiveForm}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel>Actions</FieldLabel>
              <div className="flex space-x-2">
                <Button variant="destructive" onClick={() => resetPixels() } disabled={!isActiveForm}>Reset</Button>
                <Button variant="outline" onClick={() => fileInput.current?.click() } disabled={!isActiveForm}>Upload image <ImageIcon /></Button>
                <input ref={fileInput} type="file" onChange={uploadFile} hidden />
              </div>
            </Field>
          </div>
      </CardFooter>
    </Card>
  )
}

export default UserDrawingCard;