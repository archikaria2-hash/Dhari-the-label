import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="site-announcement">
        Complimentary shipping on orders above ₹15,000
      </div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
