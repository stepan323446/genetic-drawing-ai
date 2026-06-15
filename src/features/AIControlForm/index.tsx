import { Button } from "@/shadcn/components/ui/button";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";
import { Play as PlayIcon, Pause as PauseIcon, Square as StopIcon } from "lucide-react";
import { cn } from "@/shadcn/lib/utils";
import { useActions, useSettings } from "@/app/providers/AppContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";

interface AIControlForm {
  className?: string;
}

const sizes = [8, 16, 32, 64, 128];

const AIValuesForm = ({ className }: AIControlForm) => {
  const { 
    status,
    start,
    reset,
    pause
   } = useActions();

  const {
    size,
    setSize
  } = useSettings();

  const isAlgUncompleted = status == 'running' || status == 'paused';

  return (
    <form className={cn("flex justify-between", className)} onSubmit={(e) => e.preventDefault()}>
      <div>
        <Field>
          <FieldLabel htmlFor="input-field-size">
            Size
          </FieldLabel>
          <Select onValueChange={(val) => setSize(Number(val))} value={String(size)}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Canvas size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sizes.map((sz) => (
                  <SelectItem key={sz} value={String(sz)}>{sz}x{sz}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="min-w-45">
        <Field>
          <FieldLabel>
            Control
          </FieldLabel>
          {status == 'init' && <div className="flex">
            <Button onClick={start}>Run algorithm <PlayIcon /></Button>
          </div>}
          {isAlgUncompleted && <div className="flex space-x-2">
            <Button onClick={() => reset()} variant="destructive">Reset <StopIcon /></Button>
            {status == 'running' && <Button onClick={pause} variant="outline">Pause <PauseIcon /></Button>}
            {status == 'paused' && <Button onClick={start}>Play <PlayIcon /></Button>}
          </div>}
        </Field>
      </div>
    </form>
  )
}

export default AIValuesForm;