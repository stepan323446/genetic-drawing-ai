import { User as UserIcon } from "lucide-react";
import { Badge } from "@shadcn/components/ui/badge";
import { Typography } from "@/shared";

const Welcome = () => {
  return (
    <div className="text-center mb-8">
      <Badge variant="default" className="mb-1" asChild>
        <a href="https://steve-dekart.xyz/" target="_blank">
          <UserIcon />
          Stepan Turitsin
        </a>
      </Badge>
      <Typography variant="h1" className="mb-2">Genetic Drawing AI</Typography>
      <Typography variant="subtitle1">Seminar project to demonstrate genetic algorithm in drawing</Typography>
    </div>
  )
}

export default Welcome;