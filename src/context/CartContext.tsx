import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CartItem = {
  id: string
  productId: string
  name: string
  price: number
  qty: number
  size: string
}

const STORAGE_KEY = 'dhari-cart'

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed as CartItem[]
  } catch {
    return []
  }
}

type CartContextValue = {
  items: CartItem[]
  totalQty: number
  totalPrice: number
  addToCart: (input: {
    productId: string
    name: string
    price: number
    size: string
    qty?: number
  }) => void
  setQty: (lineId: string, qty: number) => void
  removeLine: (lineId: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = useCallback(
    (input: {
      productId: string
      name: string
      price: number
      size: string
      qty?: number
    }) => {
      const qty = input.qty ?? 1
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === input.productId && i.size === input.size,
        )
        if (idx >= 0) {
          const next = [...prev]
          next[idx] = {
            ...next[idx],
            qty: next[idx].qty + qty,
          }
          return next
        }
        const id =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`
        return [
          ...prev,
          {
            id,
            productId: input.productId,
            name: input.name,
            price: input.price,
            size: input.size,
            qty,
          },
        ]
      })
    },
    [],
  )

  const setQty = useCallback((lineId: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => i.id !== lineId))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === lineId ? { ...i, qty } : i)),
    )
  }, [])

  const removeLine = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== lineId))
  }, [])

  const totalQty = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items],
  )

  const totalPrice = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      totalQty,
      totalPrice,
      addToCart,
      setQty,
      removeLine,
    }),
    [items, totalQty, totalPrice, addToCart, setQty, removeLine],
  )

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
