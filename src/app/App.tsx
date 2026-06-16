import { Container } from "@/shared";
import { TextStatsCard, Welcome } from "@/features";
import { AiDrawingCard, ControlBar, UserDrawingCard } from "@/widgets";
import AppProvider from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <Container>
        <Welcome />

        <ControlBar className="mb-4" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <UserDrawingCard width={350} />

          <AiDrawingCard width={350} />
        </div>
        <TextStatsCard />
      </Container>
    </AppProvider>
  );
}

export default App;
