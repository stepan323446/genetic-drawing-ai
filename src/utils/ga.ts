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
export function initPopulations(popSize: number, target: Uint8Array): Population[] {
  const result: Population[] = Array.from({ length: popSize }, () => {

    const population = new Uint8Array(target.length).map(() => Math.floor(Math.random() * 256));
    return { population, fitness: fitness(population, target) };
  });
  return sortPops(result);
}

// Mutate random pixels with rate
export const mutate = (ind: Uint8Array, rate: number): void => {
  const mutations = Math.floor(ind.length * rate);
  for (let i = 0; i < mutations; i++) {
    ind[Math.floor(Math.random() * ind.length)] = Math.floor(
      Math.random() * 256,
    );
  }
};

export const sortPops = (pops: Population[]) => {
  return pops.sort((a, b) => a.fitness - b.fitness);
}

export interface Population {
  population: Uint8Array
  fitness: number
}
export interface EvolveSettins {
  elitrate: number
  mutation: number
}
export const evolve = (
  pops: Population[],
  target: Uint8Array,
  settings: EvolveSettins,
): Population[] => {
  const popSize = pops.length;

  // Elites
  const eliteCount = Math.floor(popSize * settings.elitrate);
  const newPop: Population[] = pops.slice(0, eliteCount);

  // Crossover (except of elite)
  while (newPop.length < popSize) {
    const a = pops[Math.floor(Math.random() * popSize)];
    const b = pops[Math.floor(Math.random() * popSize)];
    const [c1, c2] = crossover(a.population, b.population);

    newPop.push({ population: c1, fitness: fitness(c1, target) });
    if (newPop.length < popSize) {
      newPop.push({ population: c2, fitness: fitness(c2, target) });
    }
  }

  // Mutation for all populations
  const totalMutations = Math.floor(popSize * settings.mutation);
  for (let i = 0; i < totalMutations; i++) {
    const randGene = Math.floor(Math.random() * newPop.length);
    const randPixel = Math.floor(Math.random() * target.length);
    newPop[randGene].population[randPixel] = Math.floor(Math.random() * 256);
    newPop[randGene].fitness = fitness(newPop[randGene].population, target);
  }

  return sortPops(newPop);
};
