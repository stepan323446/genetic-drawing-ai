import DrawingCanvas from "../DrawingCanvas";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";
import { ComparisonText, Typography } from "@/shared";
import { Button } from "@/shadcn/components/ui/button";

export interface CompareDataItem {
  size: number;
  populationSize: number;
  elitrate: number;
  mutation: number;
  maxIteration: number;

  generation: number;
  fitness: number;
  aiPixels: Uint8Array;
}
interface CompareDataProps {
  primaryData: CompareDataItem;
  comparationData?: CompareDataItem;
  clearData: (val?: CompareDataItem) => void;
}

const ComparisonDataText = ({
  label,
  value,
  comparison,
  inverse = false,
}: {
  label: string;
  value: number;
  comparison?: number;
  inverse?: boolean;
}) => {
  return (
    <Field className="text-2xl">
      <FieldLabel className="text-xl">{label}</FieldLabel>
      <div className="flex items-end">
        <span className="mr-2">{value.toLocaleString("run-RU")}</span>
        {comparison !== undefined && (
          <ComparisonText
            className="text-base"
            primaryValue={value}
            comparisonValue={comparison}
            inverse={inverse}
          />
        )}
      </div>
    </Field>
  );
};

const CompareData = ({
  primaryData,
  comparationData,
  clearData,
}: CompareDataProps) => {
  return (
    <div>
      <div className="block sm:flex mb-4">
        <DrawingCanvas
          className="mx-auto sm:mx-0 sm:mr-10 mb-3 sm:mb-0"
          width={150}
          size={primaryData.size}
          pixels={primaryData.aiPixels}
        />
        <div className="space-y-3">
          <ComparisonDataText
            label="Fitness"
            value={primaryData.fitness}
            comparison={comparationData?.fitness}
            inverse={true}
          />

          <ComparisonDataText
            label="Generations"
            value={primaryData.generation}
            comparison={undefined}
          />
        </div>
      </div>
      <div>
        <Typography variant="h4" className="mb-3">
          Settings
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          <Field>
            <FieldLabel>Size</FieldLabel>
            {primaryData.size}
          </Field>
          <Field>
            <FieldLabel>Population</FieldLabel>
            {primaryData.populationSize}
          </Field>
          <Field>
            <FieldLabel>Elitrate</FieldLabel>
            {primaryData.elitrate}
          </Field>
          <Field>
            <FieldLabel>Mutation</FieldLabel>
            {primaryData.mutation}
          </Field>
          <Field>
            <FieldLabel>Max Iterations</FieldLabel>
            {primaryData.maxIteration}
          </Field>
        </div>
        <div>
          <Button onClick={() => clearData(undefined)} variant="destructive">
            Clear data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareData;
