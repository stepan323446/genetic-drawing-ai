import { useActions, useGA } from "@/app/providers/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";
import { Progress } from "@/shadcn/components/ui/progress";

interface TextStatsCard {
  className?: string;
}

const TextStatsCard = ({ className }: TextStatsCard) => {
  const { status } = useActions();
  const { generation, fitness, progress } = useGA();
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          Statistic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-y-4">
          <Field>
            <FieldLabel>Generation</FieldLabel>
            {generation}
          </Field>
          <Field>
            <FieldLabel>Fitness</FieldLabel>
            {fitness}
          </Field>
          <Field>
            <FieldLabel>Status</FieldLabel>
            { status }
          </Field>
          <Field>
            <FieldLabel>
              <span>Progress</span>
              <span className="ml-auto">{progress}%</span>
            </FieldLabel>
            <Progress value={progress} />
          </Field>
        </div>
      </CardContent>
    </Card>
  )
}

export default TextStatsCard;