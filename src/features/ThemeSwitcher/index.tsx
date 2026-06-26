import { useTheme, type Theme } from "@/app/providers/ThemeContext";
import { Tabs, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Tabs value={theme} onValueChange={(val) => setTheme(val as Theme)}>
      <TabsList>
        <TabsTrigger value="system">System</TabsTrigger>
        <TabsTrigger value="light">Light <Sun /></TabsTrigger>
        <TabsTrigger value="dark">Dark <Moon /></TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher;