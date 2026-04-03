import { Link } from 'react-router-dom'
import { HERO_VIDEO_SRC } from '../data/media'

export function Home() {
  return (
    <section className="hero-root">
      <video
        className="hero-video"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="hero-overlay" aria-hidden />

      <p className="hero-label">Luxury Indian Fashion</p>
      <h1 className="hero-title">धरी - The Label</h1>
      <p className="hero-tagline">Wear the Culture</p>
      <Link to="/shop" className="hero-cta">
        Shop Now
      </Link>
    </section>
  )
}
