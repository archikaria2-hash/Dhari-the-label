import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById, PRODUCT_IMAGES } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatInr } from '../lib/format'

const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id])
  const { addToCart } = useCart()
  const [size, setSize] = useState<(typeof SIZES)[number]>('M')

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:px-10">
        <p className="body-text mb-8 text-[#8a7b6f]">Product not found.</p>
        <Link to="/shop" className="text-link-warm text-sm tracking-[0.2em] underline">
          Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-10">
      <div className="product-detail__media">
        <img src={PRODUCT_IMAGES[product.id]} alt={product.name} />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="product-detail-title">{product.name}</h1>
        <p className="product-detail-price">{formatInr(product.price)}</p>
        <p className="product-detail-desc">{product.description}</p>

        <p className="field-label">Size</p>
        <div className="mb-12 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`size-pill${size === s ? ' is-selected' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            addToCart({
              productId: product.id,
              name: product.name,
              price: product.price,
              size,
            })
          }
          className="btn-primary-dark w-full max-w-sm"
        >
          Add to Cart
        </button>

        <Link to="/shop" className="text-link-warm mt-8 hover:underline">
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
