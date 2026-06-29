import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import ThemeSwitcher from "../ThemeSwitcher";
import Markdown from "react-markdown";
import DescriptionText from './description.md?raw'
import { Badge } from "@/shadcn/components/ui/badge";
import { GitPullRequest, UserIcon } from "lucide-react";

const DescriptionCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About project</CardTitle>
        <CardAction>
          <ThemeSwitcher />
        </CardAction>
      </CardHeader>
      <CardContent className="markdown-text">
        <div className="space-x-2 mb-2">
          <Badge asChild>
            <a href="https://github.com/stepan323446/genetic-drawing-ai" target="_blank">
              Github <GitPullRequest />
            </a>
          </Badge>
          <Badge variant="outline" className="mb-1" asChild>
            <a href="https://steve-dekart.xyz/" target="_blank">
              Website
              <UserIcon />
            </a>
          </Badge>
        </div>
        <Markdown>{DescriptionText}</Markdown>
      </CardContent>
    </Card>
  )
}

export default DescriptionCard;