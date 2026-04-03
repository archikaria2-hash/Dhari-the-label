import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 7h15l-1.5 9h-12z" />
      <path d="M6 7 5 3H2" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  )
}

export function Navbar() {
  const { totalQty } = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`site-navbar${scrolled ? ' site-navbar--scrolled' : ''}`}
    >
      <nav className="site-navbar__inner" aria-label="Main">
        <Link to="/" className="site-nav-brand">
          धरी - The Label
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `site-nav-link${isActive ? ' is-active' : ''}`
            }
            end
          >
            Shop
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `site-nav-link${isActive ? ' is-active' : ''}`
            }
          >
            Account
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              ['site-nav-cart inline-flex', isActive ? 'is-active' : '']
                .filter(Boolean)
                .join(' ')
            }
          >
            <span className="relative inline-flex">
              <CartIcon className="h-5 w-5" />
              {totalQty > 0 && (
                <span className="site-cart-badge absolute -right-2.5 -top-2">
                  {totalQty > 99 ? '99+' : totalQty}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Cart</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
