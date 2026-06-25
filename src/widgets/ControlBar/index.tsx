import { useActions, useSettings } from "@/app/providers/AppContext";
import { AIControlForm, ImageExamplesDrawer } from "@/features";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";
import { cn } from "@/shadcn/lib/utils";
import { Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface ControlBarProps {
  className?: string;
}
interface Preset {
  name: string
  size: number
  populationSize: number
  elitrate: number
  mutation: number
}

const presets: Preset[] = [
  {
    name: 'Small (16x16)',
    size: 16,
    populationSize: 100,
    elitrate: 0.1,
    mutation: 0.25,
  },
  {
    name: 'Medium (32x32)',
    size: 32,
    populationSize: 200,
    elitrate: 0.1,
    mutation: 0.25,
  },
  {
    name: 'Large (64x64)',
    size: 64,
    populationSize: 1000,
    elitrate: 0.1,
    mutation: 0.25,
  },
  {
    name: 'XLarge (128x128)',
    size: 128,
    populationSize: 1000,
    elitrate: 0.1,
    mutation: 0.25,
  }
]
const ControlBar = ({ className }: ControlBarProps) => {
  const {
    size,
    setSize,
    populationSize,
    setPopulationSize,
    elitrate,
    setElitrate,
    mutation,
    setMutation,
  } = useSettings();

  const { status } = useActions();
  const [ openExamples, setOpenExamples ] = useState(false);

  const currentSettings = [
    {
      name: 'Canvas size',
      value: size
    },
    {
      name: 'Population',
      value: populationSize
    },
    {
      name: 'Elitrate',
      value: elitrate
    },
    {
      name: 'Mutation',
      value: mutation
    }
  ]

  const selectPreset = (preset: Preset) => {
    setSize(preset.size);
    setPopulationSize(preset.populationSize);
    setElitrate(preset.elitrate);
    setMutation(preset.mutation);
  }

  return (
    <Card className={cn("overflow-x-auto overflow-y-hidden", className)}>
      <CardContent>
        <AIControlForm />
      </CardContent>
      <CardFooter>
        {status == 'init' && <Field>
          <FieldLabel>Presets</FieldLabel>
          <div className="flex space-x-4">
            <Button type="button" variant="default" onClick={() => setOpenExamples(true)}>
              <ImageIcon />
            </Button>
            {presets.map((preset) => (
              <Button key={preset.name} type="button" variant="outline" onClick={() => selectPreset(preset)} disabled={status != 'init'}>{preset.name}</Button>
            ))}
          </div>
        </Field>}

        {status != 'init' && <div className="flex space-x-8">
          {currentSettings.map((preset) => (
            <Field key={preset.name}>
              <FieldLabel className="text-nowrap mb-3">{preset.name}</FieldLabel>
              <div>{preset.value}</div>
            </Field>
          ))}
        </div>}
      </CardFooter>

      <ImageExamplesDrawer open={openExamples} onOpenChange={setOpenExamples} size={size} />
    </Card>
  )
}

export default ControlBar;