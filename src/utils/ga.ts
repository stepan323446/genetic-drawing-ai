export interface Individual {
  genes: Uint8Array
  fitness: number
}

// Fitness function fi = |current - target|
export const fitness = (current: Uint8Array, target: Uint8Array): number => {
  let diff = 0;
  for (let i = 0; i < current.length; i++) {
    diff += Math.abs(current[i] - target[i]);
  }
  return diff;
};

// Crossing pops between ones
export const crossover = (
  a: Uint8Array,
  b: Uint8Array,
): [Uint8Array, Uint8Array] => {
  const child1 = new Uint8Array(a.length);
  const child2 = new Uint8Array(a.length);
  const cut = Math.floor(Math.random() * a.length);

  // Child 1
  child1.set(a.subarray(0, cut));
  child1.set(b.subarray(cut), cut);

  // Child 2
  child2.set(b.subarray(0, cut));
  child2.set(a.subarray(cut), cut);

  return [child1, child2];
};

// Init pops with random noise
export function initPopulation(popSize: number, target: Uint8Array): Individual[] {
  const result: Individual[] = Array.from({ length: popSize }, () => {

    const genes = new Uint8Array(target.length).map(() => Math.floor(Math.random() * 256));
    return { genes, fitness: fitness(genes, target) };
  });
  return sortPopulation(result);
}

// Mutate random pixels with rate
export const mutate = (indiv: Individual, target: Uint8Array): void => {
  const randPixel      = Math.floor(Math.random() * indiv.genes.length);
  const randValue      = Math.floor(Math.random() * 256);

  indiv.genes[randPixel] = randValue;
  indiv.fitness = fitness(indiv.genes, target);
};

export const sortPopulation = (population: Individual[]) => {
  return population.sort((a, b) => a.fitness - b.fitness);
}


export interface EvolveSettins {
  elitrate: number
  mutation: number
  maxIteration: number
}
export const evolve = (
  population: Individual[],
  target: Uint8Array,
  settings: EvolveSettins,
): Individual[] => {
  const popSize = population.length;

  // Elites
  const eliteCount = Math.floor(popSize * settings.elitrate);
  const newPop: Individual[] = population.slice(0, eliteCount);

  // Crossover (except of elite)
  while (newPop.length < popSize) {
    const a = population[Math.floor(Math.random() * popSize)];
    const b = population[Math.floor(Math.random() * popSize)];
    const [c1, c2] = crossover(a.genes, b.genes);

    newPop.push({ genes: c1, fitness: fitness(c1, target) });
    if (newPop.length < popSize) {
      newPop.push({ genes: c2, fitness: fitness(c2, target) });
    }
  }

  // Mutation for all populations
  const totalMutations = popSize * settings.mutation;
  for (let i = 0; i < totalMutations; i++) {
    const randPopulation = Math.floor(Math.random() * newPop.length);

    mutate(newPop[randPopulation], target);
  }

  return sortPopulation(newPop);
};
