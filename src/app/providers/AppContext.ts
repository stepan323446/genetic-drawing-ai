import { createContext, useContext } from "react";

// --- Context types ---
export type AIStatus = 'init'|'running'|'paused'|'completed';
export interface FitnessStoryItem {
  generation: number;
  normalizedFi: number;
  fitness: number;
}

// --- Context Props ---
export interface SettingsContextProps {
  size: number
  speed: number
  setSize: (val: number) => void
  modifySpeed: (val: number) => void

  populationSize: number
  setPopulationSize: (val: number) => void

  elitrate: number
  setElitrate: (val: number) => void

  mutation: number
  setMutation: (val: number) => void

  maxIteration: number
  setMaxIteration: (val: number) => void
}

export interface ActionsContextProps {
  status: AIStatus
  start: () => void
  pause: () => void
  reset: () => void
  resume: () => void
}

export interface GAContextProps {
  generation: number
  
  fitness: number
  progress: number

  userPixels: React.RefObject<Uint8Array>
  aiPixels: React.RefObject<Uint8Array>
  modifyUserPixel: (x: number, y: number, value: number, brushSize: number) => void
  resetPixels: () => void
  userCanvasTrigger: boolean
  updateUserTrigger: () => void
  chartDataRef: React.RefObject<FitnessStoryItem[]>
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