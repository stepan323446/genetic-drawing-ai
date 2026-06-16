import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  type AIStatus,
  SettingsContext,
  ActionsContext,
  GAContext,
} from "./AppContext";

interface AppProviderProps {
  children?: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [fitness, setFitness] = useState(0);
  const [generation, setGeneration] = useState(0);
  const [aiStatus, setAiStatus] = useState<AIStatus>("init");
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(32);
  const userPixels = useRef(new Uint8Array(size * size).fill(255));
  const aiPixels = useRef(new Uint8Array(size * size).fill(255));
  const [userCanvasTrigger, setUserCanvasTrigger] = useState(false);
  const [populationSize, setPopulationSize] = useState(100);
  const [elitrate, setElitrate] = useState(0.1);
  const [mutation, setMutation] = useState(0.25);
  const [maxIteration, setMaxIteration] = useState(0);
  const [progress, setProgress] = useState(0);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('@/utils/ga.worker.ts', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'UPDATE') {
        aiPixels.current = e.data.aiPixels;
        setGeneration(e.data.generation);
        setFitness(e.data.fitness);
        setProgress(e.data.progress);
      }
    };
  }, [])

  const start = () => {
    setAiStatus("running");

    workerRef.current?.postMessage({
      type: 'START',
      target: userPixels.current,
      popSize: populationSize,
      speed,
      settings: { elitrate, mutation },
    });
  };
  const pause = () => {
    if (aiStatus != "running") {
      console.log("AI is not running to set pause");
      return;
    }

    setAiStatus("paused");
    workerRef.current?.postMessage({ type: 'PAUSE' });
  };
  const setSizeCanvas = (value: number) => {
    if (aiStatus != "init") {
      console.log("AI must be in initional state. Stop it");
      return;
    }
    reset(value);
    workerRef.current?.postMessage({ type: 'RESUME' });
  };
  const updateUserTrigger = () => setUserCanvasTrigger(!userCanvasTrigger);
  const resetPixels = (newSize: number = size) => {
    userPixels.current = new Uint8Array(newSize * newSize).fill(255);
    aiPixels.current = new Uint8Array(newSize * newSize).fill(255);
    updateUserTrigger();
  };
  const modifySpeed = (value: number) => {
    setSpeed(value);
    workerRef.current?.postMessage({ type: 'UPDATE_SPEED', speed: value });
  }

  const reset = (newSize: number = 32) => {
    setAiStatus("init");
    workerRef.current?.postMessage({ type: 'RESET' });
    setSpeed(100);
    setGeneration(0);
    setSize(newSize);
    resetPixels(newSize);
  };
  const modifyUserPixel = (
    x: number,
    y: number,
    value: number,
    brushSize: number,
  ) => {
    const half = Math.floor(brushSize / 2);

    for (let dy = -half; dy <= half; dy++) {
      for (let dx = -half; dx <= half; dx++) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || nx >= size || ny < 0 || ny >= size) continue;
        userPixels.current[ny * size + nx] = value;
      }
    }
    updateUserTrigger();
  };

  return (
    <SettingsContext.Provider
      value={{ 
        size, speed, setSize: setSizeCanvas, modifySpeed,
        populationSize, setPopulationSize,
        elitrate, setElitrate,
        mutation, setMutation,
        maxIteration, setMaxIteration
       }}
    >
      <ActionsContext.Provider
        value={{ start, pause, reset, status: aiStatus }}
      >
        <GAContext.Provider
          value={{
            fitness,
            generation,
            userPixels,
            aiPixels,
            modifyUserPixel,
            userCanvasTrigger,
            resetPixels,
            updateUserTrigger,
            progress
          }}
        >
          {children}
        </GAContext.Provider>
      </ActionsContext.Provider>
    </SettingsContext.Provider>
  );
};

export default AppProvider;
