import { evolve, initGenes } from './ga';
import type { Gene, EvolveSettins } from './ga';

type TypeMessage = 'START'|'PAUSE'|'RESUME'|'UPDATE_SPEED'|'RESET';
interface EventGAMessage {
  type: TypeMessage
  target?: Uint8Array
  settings?: EvolveSettins
  speed?: number
  popSize?: number
}

let paused = false;
let genes: Gene[] = [];
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

    genes = initGenes(e.data.popSize!, e.data.target!);
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
    genes = [];
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
    if (!genes) return;

    genes = evolve(genes, currentTarget, currentSettings);
    
    if(gen == 0)
      startFitness = genes[0].fitness;

    gen++;

    const progress = Math.round(
      (1 - genes[0].fitness / startFitness) * 100
    );

    self.postMessage({
      type: 'UPDATE',
      generation: gen,
      fitness: genes[0].fitness,
      aiPixels: genes[0].population,
      progress: progress
    });

    console.log(`Generation: ${gen} and Fitness: ${genes[0].fitness} and Progress: ${progress}`);
    setTimeout(step, currentSpeed);
  };

  step();
}