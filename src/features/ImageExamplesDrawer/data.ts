import keqinq8x8 from '@/assets/examples/8x8_keqinq.jpg';
import shirogane32x32 from '@/assets/examples/32x32_shirogane.jpg';

export interface ExampleSection {
  title: string
  imageUrls: string[]
}

export const exampleData: ExampleSection[] = [
  {
    title: "Images 8x8",
    imageUrls: [
      keqinq8x8,
      keqinq8x8,
      keqinq8x8,
      keqinq8x8,
      keqinq8x8,
      keqinq8x8,
    ]
  },
  {
    title: "Images 32x32",
    imageUrls: [
      shirogane32x32
    ]
  }
]