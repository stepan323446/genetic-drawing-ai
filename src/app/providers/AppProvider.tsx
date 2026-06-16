import { useRef, useState, type ReactNode } from "react";
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
  const [fitness] = useState(0);
  const [generation, setGeneration] = useState(0);
  const [aiStatus, setAiStatus] = useState<AIStatus>("init");
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(32);
  const userPixels = useRef(new Uint8Array(size * size).fill(255));
  const aiPixels = useRef(new Uint8Array(size * size).fill(255));
  const [userCanvasTrigger, setUserCanvasTrigger] = useState(false);

  const start = () => {
    setAiStatus("running");
  };
  const pause = () => {
    if (aiStatus != "running") {
      console.log("AI is not running to set pause");
      return;
    }

    setAiStatus("paused");
  };
  const setSizeCanvas = (value: number) => {
    if (aiStatus != "init") {
      console.log("AI must be in initional state. Stop it");
      return;
    }
    reset(value);
  };
  const updateUserTrigger = () => setUserCanvasTrigger(!userCanvasTrigger);
  const resetPixels = (newSize: number = size) => {
    userPixels.current = new Uint8Array(newSize * newSize).fill(255);
    aiPixels.current = new Uint8Array(newSize * newSize).fill(255);
    updateUserTrigger();
  };

  const reset = (newSize: number = 32) => {
    setAiStatus("init");
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
      value={{ size, speed, setSize: setSizeCanvas, setSpeed }}
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
          }}
        >
          {children}
        </GAContext.Provider>
      </ActionsContext.Provider>
    </SettingsContext.Provider>
  );
};

export default AppProvider;
