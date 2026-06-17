import { Button } from "@/shadcn/components/ui/button";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";
import {
  Play as PlayIcon,
  Pause as PauseIcon,
  Square as StopIcon,
} from "lucide-react";
import { cn } from "@/shadcn/lib/utils";
import { useActions, useSettings } from "@/app/providers/AppContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { Input } from "@/shadcn/components/ui/input";
import { Slider } from "@/shadcn/components/ui/slider";

interface AIControlForm {
  className?: string;
}

const sizes = [2, 4, 8, 16, 32, 64, 128];

const AIValuesForm = ({ className }: AIControlForm) => {
  const { status, start, resume, reset, pause } = useActions();

  const {
    size,
    setSize,

    speed,
    modifySpeed,

    populationSize,
    setPopulationSize,

    elitrate,
    setElitrate,

    mutation,
    setMutation,

    maxIteration,
    setMaxIteration,
  } = useSettings();

  const isAlgUncompleted = status == "running" || status == "paused";

  return (
    <form
      className={cn("flex justify-between", className)}
      onSubmit={(e) => e.preventDefault()}
    >
      {status == "init" && (
        <div className="flex space-x-4 me-5 shrink-0">
          <Field>
            <FieldLabel htmlFor="input-field-size">Size</FieldLabel>
            <Select
              onValueChange={(val) => setSize(Number(val))}
              value={String(size)}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Canvas size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sizes.map((sz) => (
                    <SelectItem key={sz} value={String(sz)}>
                      {sz}x{sz}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-size">Population</FieldLabel>
            <Input
              type="number"
              min={4}
              max={1000}
              step={1}
              value={populationSize}
              onChange={(e) => setPopulationSize(+e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-size">Mutation</FieldLabel>
            <Input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={mutation}
              onChange={(e) => setMutation(+e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-size">Elitrate</FieldLabel>
            <Input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={elitrate}
              onChange={(e) => setElitrate(+e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-size">Max Iterations</FieldLabel>
            <Input
              type="number"
              min={0}
              step={1}
              value={maxIteration}
              onChange={(e) => setMaxIteration(+e.target.value)}
            />
          </Field>
        </div>
      )}

      {status != 'init' && <div className="flex space-x-4 me-5 shrink-0">
        <Field className="w-70">
          <FieldLabel className="mb-2">Speed ({speed}ms)</FieldLabel>
          <Slider
            defaultValue={[speed]}
            min={1}
            max={1000}
            onValueChange={(val) => modifySpeed(val[0])}
          />
        </Field>
      </div>}

      <div className="min-w-45">
        <Field>
          <FieldLabel>Control</FieldLabel>
          {status == "init" && (
            <div className="flex">
              <Button onClick={start}>
                Run algorithm <PlayIcon />
              </Button>
            </div>
          )}
          {isAlgUncompleted && (
            <div className="flex space-x-2">
              <Button
                onClick={() => reset()}
                type="button"
                variant="destructive"
              >
                Reset <StopIcon />
              </Button>
              {status == "running" && (
                <Button onClick={pause} type="button" variant="outline">
                  Pause <PauseIcon />
                </Button>
              )}
              {status == "paused" && (
                <Button onClick={resume} type="button">
                  Play <PlayIcon />
                </Button>
              )}
            </div>
          )}
        </Field>
      </div>
    </form>
  );
};

export default AIValuesForm;
