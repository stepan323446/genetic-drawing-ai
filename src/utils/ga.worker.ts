import { evolve, initPopulations } from './ga';
import type { Population, EvolveSettins } from './ga';

type TypeMessage = 'START'|'PAUSE'|'RESUME'|'UPDATE_SPEED'|'RESET';
interface EventGAMessage {
  type: TypeMessage
  runId: number
  target?: Uint8Array
  settings?: EvolveSettins
  speed?: number
  popSize?: number
}

let runId = 0;
let paused = false;
let pops: Population[] = [];
let gen = 0;
let currentSettings: EvolveSettins|undefined = undefined;
let currentTarget: Uint8Array = new Uint8Array();
let currentSpeed = 100;
let startFitness = 1;

self.onmessage = (e: MessageEvent<EventGAMessage>) => {
  if (e.data.type === 'START') {
    paused = false;
    currentSpeed = e.data.speed!;
    currentTarget = e.data.target!;
    currentSettings = e.data.settings;
    runId = e.data.runId;

    pops = initPopulations(e.data.popSize!, e.data.target!);
    runLoop();
  }
  if (e.data.type === 'PAUSE') {
    paused = true;
  }
  if (e.data.type === 'RESUME') {
    paused = false;
    runLoop();
  }
  if (e.data.type === 'RESET') {
    paused = true;
    pops = [];
    gen = 0;
  }
  if (e.data.type === 'UPDATE_SPEED') {
    currentSpeed = e.data.speed!;
  }
};



function runLoop() {
  const step = () => {
    if (!currentSettings) return;
    if (paused) return;
    if (!pops) return;

    pops = evolve(pops, currentTarget, currentSettings);
    
    if(gen == 0)
      startFitness = pops[0].fitness;

    gen++;

    const progress = Math.round(
      (1 - pops[0].fitness / startFitness) * 100
    );

    self.postMessage({
      type: 'UPDATE',
      runId: runId,
      generation: gen,
      fitness: pops[0].fitness,
      aiPixels: pops[0].population,
      progress: progress
    });

    if(gen == currentSettings.maxIteration) {
      paused = true;
      self.postMessage({
        type: 'MAX_ITERATION_PAUSED'
      });
      return;
    }

    setTimeout(step, currentSpeed);
  };

  step();
}