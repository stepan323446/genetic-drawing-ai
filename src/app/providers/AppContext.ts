import { createContext, useContext } from "react";

export type AIStatus = 'init'|'running'|'paused'|'completed';

// --- Interfaces ---
export interface SettingsContextProps {
  size: number
  speed: number
  setSize: (val: number) => void
  setSpeed: (val: number) => void
}

export interface ActionsContextProps {
  status: AIStatus
  start: () => void
  pause: () => void
  reset: () => void
}

export interface GAContextProps {
  generation: number
  
  fitness: number

  userPixels: React.RefObject<Uint8Array>
  aiPixels: React.RefObject<Uint8Array>
  modifyUserPixel: (x: number, y: number, value: number, brushSize: number) => void;
  resetPixels: () => void;
  userCanvasTrigger: boolean;
  updateUserTrigger: () => void;
}

// --- Contexts ---
export const SettingsContext = createContext<SettingsContextProps|undefined>(undefined)
export const ActionsContext  = createContext<ActionsContextProps|undefined>(undefined)
export const GAContext       = createContext<GAContextProps|undefined>(undefined)

// --- Hooks ---
export const useSettings = () => {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within AppProvider')
  return ctx
}
export const useActions = () => {
  const ctx = useContext(ActionsContext)
  if (!ctx) throw new Error('useActions must be used within AppProvider')
  return ctx
}
export const useGA = () => {
  const ctx = useContext(GAContext)
  if (!ctx) throw new Error('useGA must be used within AppProvider')
  return ctx
}