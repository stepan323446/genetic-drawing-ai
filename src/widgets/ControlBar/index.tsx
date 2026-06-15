import { AIControlForm } from "@/features";
import { Card, CardContent } from "@/shadcn/components/ui/card";

interface ControlBarProps {
  className?: string;
}

const ControlBar = ({ className }: ControlBarProps) => {
  

  return (
    <Card className={className}>
      <CardContent>
        <AIControlForm />
      </CardContent>
    </Card>
  )
}

export default ControlBar;