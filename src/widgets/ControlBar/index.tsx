import { useActions, useSettings } from "@/app/providers/AppContext";
import { AIControlForm } from "@/features";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";

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
    populationSize: 500,
    elitrate: 0.1,
    mutation: 0.25,
  },
  {
    name: 'XLarge (128x128)',
    size: 128,
    populationSize: 1000,
    elitrate: 0.1,
    mutation: 0.25,
  },
  {
    name: 'Fast',
    size: 32,
    populationSize: 100,
    elitrate: 0.2,  // больше элит
    mutation: 0.5,  // много мутаций
  },
  {
    name: 'Precise',
    size: 32,
    populationSize: 1000,
    elitrate: 0.05, // мало элит — больше разнообразия
    mutation: 0.1,
  },
  {
    name: 'Chaos',
    size: 32,
    populationSize: 200,
    elitrate: 0.01,
    mutation: 1.0,  // 200 мутаций — почти каждая особь меняется
  },
  {
    name: 'Elitist',
    size: 32,
    populationSize: 200,
    elitrate: 0.5,  // половина — элиты
    mutation: 0.05,
  }
]
const ControlBar = ({ className }: ControlBarProps) => {
  const {
      setSize,
      setPopulationSize,
      setElitrate,
      setMutation,
    } = useSettings();

   const { status } = useActions();

  const selectPreset = (preset: Preset) => {
    setSize(preset.size);
    setPopulationSize(preset.populationSize);
    setElitrate(preset.elitrate);
    setMutation(preset.mutation);
  }

  return (
    <Card className={className}>
      <CardContent className="overflow-x-auto overflow-y-hidden">
        <AIControlForm />
      </CardContent>
      <CardFooter>
        <Field>
          <FieldLabel>Presets</FieldLabel>
          <div className="flex space-x-4">
            {presets.map((preset) => (
              <Button type="button" variant="outline" onClick={() => selectPreset(preset)} disabled={status != 'init'}>{preset.name}</Button>
            ))}
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default ControlBar;