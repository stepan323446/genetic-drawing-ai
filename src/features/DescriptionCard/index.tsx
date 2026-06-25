import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import ThemeSwitcher from "../ThemeSwitcher";

const DescriptionCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About project</CardTitle>
        <CardAction>
          <ThemeSwitcher />
        </CardAction>
      </CardHeader>
      <CardContent>
        Nothing
      </CardContent>
    </Card>
  )
}

export default DescriptionCard;