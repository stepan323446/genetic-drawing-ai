import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import ThemeSwitcher from "../ThemeSwitcher";
import Markdown from "react-markdown";
import DescriptionText from './description.md?raw'

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
        <Markdown>{DescriptionText}</Markdown>
      </CardContent>
    </Card>
  )
}

export default DescriptionCard;