import { NavLink, Link } from 'react-router-dom'

const CIPHER_LINKS = [
  { to: '/vigenere', label: 'Vigenere' },
  { to: '/affine',   label: 'Affine' },
  { to: '/playfair', label: 'Playfair' },
  { to: '/hill',     label: 'Hill 3×3' },
  { to: '/enigma',   label: 'Enigma' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-obsidian-950/95 backdrop-blur-sm border-b border-gold-800/20">
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C60, transparent)' }}
      />
      <nav className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Logo */}
          <Link to="/" className="no-underline shrink-0">
            <span
              className="font-cinzel-deco font-bold tracking-widest text-sm gold-text"
              style={{ letterSpacing: '0.18em' }}
            >
              Cipher Calculator
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-gold-800/30" />

          {/* Cipher nav */}
          <div className="flex flex-wrap justify-center gap-1">
            {CIPHER_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `cipher-nav-btn rounded-sm ${isActive ? 'active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
