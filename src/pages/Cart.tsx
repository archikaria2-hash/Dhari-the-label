import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatInr } from '../lib/format'

export function Cart() {
  const { items, totalPrice, setQty, removeLine } = useCart()

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10">
      <h1 className="page-title">Cart</h1>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="body-text mb-8 text-[#8a7b6f]">Your cart is empty.</p>
          <Link to="/shop" className="btn-editorial inline-block">
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-[#d4c4b0] border-y border-[#d4c4b0]">
            {items.map((line) => (
              <li
                key={line.id}
                className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-heading text-lg font-normal text-[#1a1008]">
                    {line.name}
                  </h2>
                  <p className="body-text mt-1 text-sm text-[#8a7b6f]">
                    Size {line.size} · {formatInr(line.price)} each
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="body-text flex items-center gap-2 text-sm text-[#8a7b6f]">
                    <span className="sr-only">Quantity</span>
                    <input
                      type="number"
                      min={1}
                      value={line.qty}
                      onChange={(e) => {
                        const v = Number.parseInt(e.target.value, 10)
                        if (Number.isNaN(v)) return
                        setQty(line.id, v)
                      }}
                      className="cart-qty-input"
                    />
                  </label>
                  <p className="body-text min-w-[7rem] text-right text-sm text-[#1a1008]">
                    {formatInr(line.price * line.qty)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="body-text text-xs tracking-widest text-[#a89888] underline-offset-4 transition-colors hover:text-[#1a1008] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-end gap-8 border-t border-[#d4c4b0] pt-10">
            <p className="cart-total">Total · {formatInr(totalPrice)}</p>
            <button
              type="button"
              onClick={() => alert('Order Placed!')}
              className="btn-primary-dark w-full max-w-sm sm:w-auto sm:px-16"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}
