import { Container } from "@/shared";
import { ComparatorCard, DescriptionCard, FitnessGraphCard, SpeedCard, TextStatsCard, Welcome } from "@/features";
import { AiDrawingCard, ControlBar, UserDrawingCard } from "@/widgets";
import AppProvider from "./providers/AppProvider";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <Container className="space-y-4">
          <Welcome />

          <ControlBar />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <UserDrawingCard width={350} />

            <AiDrawingCard width={350} />
          </div>
          <TextStatsCard />
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 items-start mb-4">
            <FitnessGraphCard />
            <SpeedCard />
          </div>
          <ComparatorCard />
          <DescriptionCard />
        </Container>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
