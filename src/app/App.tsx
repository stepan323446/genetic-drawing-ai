import { Container } from "@/shared";
import { Welcome } from "@/features";
import { ControlBar, UserDrawingCard } from "@/widgets";
import AppProvider from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <Container>
        <Welcome />

        <ControlBar className="mb-4" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UserDrawingCard width={350} />

          <UserDrawingCard width={350} />
        </div>
      </Container>
    </AppProvider>
  );
}

export default App;
