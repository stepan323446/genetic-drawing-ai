# Generic Drawing AI

The project is a web application for the interactive configuration and execution of a genetic algorithm. Users can flexibly define the algorithm's parameters, including canvas size, population size, mutation rates, the number of elite individuals, and iteration limits.

To define the target image, an interactive canvas is provided, allowing users to draw manually, use pre-made examples, or upload their own images.

During the algorithm's execution, the user can observe the computation process in real-time, with the system displaying the best image of the population, the current generation, the fitness function value, the execution status, and other relevant metrics.

## Algorithm Properties

1. **Creating the initial population**: The algorithm generates a random set of potential solutions (individuals). In this project, an "individual" is an attempt by the algorithm to reconstruct the drawing.
2. **Fitness function**: Each individual is checked for "fitness." The program compares how close the current drawing is to the target image.
3. **Selection**: The best individuals (those whose drawing most closely resembles the original) are given the right to pass their "genes" to the next generation.
4. **Crossover**: Combining the characteristics of two successful solutions to create offspring. In this project, crossover occurs between random offspring.
5. **Mutation**: Introducing random changes to "genes" (random color changes) in order to prevent the algorithm from getting stuck in a local minimum and to add diversity.
6. **Repetition**: The process repeats over many generations until the desired result is achieved or the iteration limit is reached.

## Fitness Function

In this implementation, the fitness function determines the degree of similarity between the generated image and the target image by calculating the total deviation of pixel values.

![fitness](/readme/fitness.png)

- **n** — number of pixels (canvas size);
- **ci** — value of the i-th pixel of the current image;
- **ti** — value of the i-th pixel of the target image.