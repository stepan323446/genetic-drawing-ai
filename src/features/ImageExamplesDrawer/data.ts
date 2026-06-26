import heart8x8 from '@/assets/examples/8x8heart.png';
import man8x8 from '@/assets/examples/8x8man.png';

import cappibara16 from '@/assets/examples/16x16cappibara.jpg';
import zelda16 from '@/assets/examples/16x16zelda.png';
import egg16 from '@/assets/examples/16x16egg.webp';

import starwars32 from '@/assets/examples/32x32starwars.jpg';
import ghost32 from '@/assets/examples/32x32ghost.jpg';
import eye32 from '@/assets/examples/32x32eye.jpg';
import kirby32 from '@/assets/examples/32x32kirby.png';
import tree32 from '@/assets/examples/32x32tree.jpeg';
import detective64 from '@/assets/examples/64x64detective.webp';

import keqinq64 from '@/assets/examples/64x64_keqinq.jpg';
import shirogane64 from '@/assets/examples/64x64_shirogane.jpg';
import landscape64 from '@/assets/examples/64x64landscape.jpg';
import ruins64 from '@/assets/examples/64x64ruins.webp';
import man64 from '@/assets/examples/64x64man.jpg';
import man2_64 from '@/assets/examples/64x64man2.png';
import woman64 from '@/assets/examples/64x64woman.jpeg';
import woman2_64 from '@/assets/examples/64x64woman2.webp';
import galaxy64 from '@/assets/examples/64x64galaxy.jpg';

import monalisa128 from '@/assets/examples/128x128_monalisa.webp';
import unknown128 from '@/assets/examples/128x128unknown.jpg';
import wanderer128 from '@/assets/examples/128x128wanderer.jpeg';
import landscape128 from '@/assets/examples/128x128landscape.jpg';
import subotica128 from '@/assets/examples/128x128subotica.jpg';

export interface ExampleSection {
  title: string
  imageUrls: string[]
}

export const exampleData: ExampleSection[] = [
  {
    title: "Images 8x8",
    imageUrls: [
      man8x8,
      heart8x8
    ]
  },
  {
    title: "Images 16x16",
    imageUrls: [
      cappibara16,
      zelda16,
      egg16
    ]
  },
  {
    title: "Images 32x32",
    imageUrls: [
      ghost32,
      starwars32,
      eye32,
      kirby32,
      tree32
    ]
  },
  {
    title: "Images 64x64",
    imageUrls: [
      keqinq64,
      shirogane64,
      landscape64,
      ruins64,
      man64,
      man2_64,
      woman64,
      woman2_64,
      galaxy64,
      detective64
    ]
  },
  {
    title: "Images 128x128",
    imageUrls: [
      monalisa128,
      unknown128,
      wanderer128,
      landscape128,
      subotica128
    ]
  }
]