import { useState } from 'react'

export function Account() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="mx-auto max-w-md px-6 py-24 md:px-10">
      <h1 className="page-title">Account</h1>

      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-editorial"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-editorial"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="btn-primary-dark w-full max-w-none">
          Login
        </button>
      </form>
    </div>
  )
}
