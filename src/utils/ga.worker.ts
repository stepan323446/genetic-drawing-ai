import { evolve, initPopulation } from './ga';
import type { Individual, EvolveSettins } from './ga';

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
let population: Individual[] = [];
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

    population = initPopulation(e.data.popSize!, e.data.target!);
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
    population = [];
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
    if (!population) return;

    population = evolve(population, currentTarget, currentSettings);
    
    if(gen == 0)
      startFitness = population[0].fitness;

    gen++;

    const progress = Math.round(
      (1 - population[0].fitness / startFitness) * 100
    );

    self.postMessage({
      type: 'UPDATE',
      runId: runId,
      generation: gen,
      fitness: population[0].fitness,
      aiPixels: population[0].genes,
      progress: progress
    });

    // Auto pause after max iterations
    if(gen == currentSettings.maxIteration) {
      paused = true;
      self.postMessage({
        type: 'AUTO_PAUSED'
      });
      return;
    }
    // Auto pause when fitness is 0 (success)
    if(population[0].fitness == 0) {
      paused = true;
      self.postMessage({
        type: 'AUTO_PAUSED'
      });
      return;
    }

    setTimeout(step, currentSpeed);
  };

  step();
}