import type { FitnessStoryItem } from "@/app/providers/AppContext";

const decimateFitnessStory = (data: FitnessStoryItem[], maxPoints = 500) => {
  if (data.length <= maxPoints) return data;
  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, i) => i % step === 0);
};

export default decimateFitnessStory;