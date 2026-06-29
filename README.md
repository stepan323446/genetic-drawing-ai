# Generic Drawing AI

The project is a web application for the interactive configuration and execution of a genetic algorithm. Users can flexibly define the algorithm's parameters, including canvas size, population size, mutation rates, the number of elite individuals, and iteration limits.

To define the target image, an interactive canvas is provided, allowing users to draw manually, use pre-made examples, or upload their own images.

During the algorithm's execution, the user can observe the computation process in real-time, with the system displaying the best image of the population, the current generation, the fitness function value, the execution status, and other relevant metrics.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository
2. Install dependencies (Ensure you have Node.js version 22.0.0 or higher installed)
```
npm ci
```
3. Run the project
```
npm run dev
```

## Algorithm Properties

1. **Creating the initial population**: The algorithm generates a random set of potential solutions (individuals). In this project, an "individual" is an attempt by the algorithm to reconstruct the drawing.
2. **Fitness function**: Each individual is checked for "fitness." The program compares how close the current drawing is to the target image.
3. **Selection**: The best individuals (those whose drawing most closely resembles the original) are given the right to pass their "genes" to the next generation.
4. **Crossover**: Combining the characteristics of two successful solutions to create offspring. In this project, crossover occurs between random offspring.
5. **Mutation**: Introducing random changes to "genes" (random color changes) in order to prevent the algorithm from getting stuck in a local minimum and to add diversity.
6. **Repetition**: The process repeats over many generations until the desired result is achieved or the iteration limit is reached.

## Fitness Function

In this implementation, the fitness function determines the degree of similarity between the generated image and the target image by calculating the total deviation of pixel values.

![fitness](/public//readme/fitness.png)

- **n** — number of pixels (canvas size);
- **ci** — value of the i-th pixel of the current image;
- **ti** — value of the i-th pixel of the target image.


### Code
The primary implementation of the algorithm is located in the `ga.worker.ts` file, while the supporting core logic and utility functions are defined in `ga.ts`.

- [ga.worker.ts](/src/utils/ga.worker.ts): Contains the Web Worker implementation, which handles the computationally intensive parts of the genetic algorithm to prevent UI blocking.
- [ga.ts](/src/utils/ga.ts): Contains the core algorithmic functions, data structures, and logic required for the evolution process.