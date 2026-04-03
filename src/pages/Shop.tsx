import { Link } from 'react-router-dom'
import { PRODUCT_IMAGES, PRODUCTS } from '../data/products'
import { formatInr } from '../lib/format'

export function Shop() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <header className="collections-header">
        <h1 className="collections-title">The Collection</h1>
        <p className="collections-subtitle">
          Curated pieces for the modern wardrobe
        </p>
      </header>

      <ul className="collections-grid">
        {PRODUCTS.map((p) => (
          <li key={p.id} className="shop-card">
            <div className="shop-card__media">
              <img src={PRODUCT_IMAGES[p.id]} alt={p.name} />
            </div>
            <h2 className="shop-card__name">{p.name}</h2>
            <p className="shop-card__price">{formatInr(p.price)}</p>
            <Link to={`/product/${p.id}`} className="btn-editorial">
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
