import product1Image from '../assets/product1.jpg'
import product2Image from '../assets/product2.jpg'
import product3Image from '../assets/product3.jpg'
import product4Image from '../assets/product4.jpg'
import product5Image from '../assets/product5.jpg'
import product6Image from '../assets/product6.jpg'

/** Shop & detail images: Product 1 → product1.jpg, … Product 6 → product6.jpg */
export const PRODUCT_IMAGES: Record<string, string> = {
  '1': product1Image,
  '2': product2Image,
  '3': product3Image,
  '4': product4Image,
  '5': product5Image,
  '6': product6Image,
}

export type Product = {
  id: string
  name: string
  price: number
  description: string
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ivory Silk Drape Saree',
    price: 24999,
    description: 'Handwoven silk with minimal border detailing.',
  },
  {
    id: '2',
    name: 'Charcoal Linen Kurta Set',
    price: 8999,
    description: 'Tailored linen with subtle texture.',
  },
  {
    id: '3',
    name: 'Pearl Embroidered Lehenga',
    price: 45999,
    description: 'Statement embroidery on structured silhouette.',
  },
  {
    id: '4',
    name: 'Monochrome Bandhgala',
    price: 12999,
    description: 'Structured bandhgala in matte finish.',
  },
  {
    id: '5',
    name: 'Heritage Jamdani Dupatta',
    price: 6999,
    description: 'Fine weave with traditional motifs.',
  },
  {
    id: '6',
    name: 'Minimal Dhoti Trousers',
    price: 5999,
    description: 'Contemporary drape with clean lines.',
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
