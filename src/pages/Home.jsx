import { Link } from 'react-router-dom'

const CIPHERS = [
  {
    to: '/vigenere',
    icon: '🔑',
    name: 'Vigenere',
    desc: 'Cipher polialfabetik menggunakan kata kunci berulang untuk enkripsi substitusi.',
    badge: 'Polialfabetik',
  },
  {
    to: '/affine',
    icon: '∑',
    name: 'Affine',
    desc: 'Cipher substitusi berbasis fungsi linear E(x) = (ax + b) mod 26.',
    badge: 'Matematis',
  },
  {
    to: '/playfair',
    icon: '⊞',
    name: 'Playfair',
    desc: 'Cipher digraf menggunakan matriks kunci 5×5 dengan pasangan huruf.',
    badge: 'Digraf',
  },
  {
    to: '/hill',
    icon: '⬡',
    name: 'Hill 3×3',
    desc: 'Cipher berbasis perkalian matriks 3×3 dengan aritmetika modular.',
    badge: 'Matriks',
  },
  {
    to: '/enigma',
    icon: '⚙',
    name: 'Enigma',
    desc: 'Simulasi mesin Enigma 3-rotor historis, simetris untuk enkripsi & dekripsi.',
    badge: 'Rotor',
  },
]

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="text-center py-12 px-4">
        <div
          className="font-cinzel-deco font-bold tracking-widest mb-4 leading-tight"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            background: 'linear-gradient(180deg, #F0D080 0%, #C9A84C 50%, #8B6914 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.4))',
          }}
        >
          Cipher Calculator
        </div>
        <p className="font-cormorant italic text-gold-600 text-xl tracking-wide max-w-xl mx-auto">
          Kalkulator kriptografi klasik — enkripsi &amp; dekripsi dengan lima metode cipher pilihan
        </p>

        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="w-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }} />
          <span className="text-gold-600 text-xs tracking-widest">✦ ✦ ✦</span>
          <div className="w-24 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }} />
        </div>
      </div>

      {/* Cipher cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {CIPHERS.map(({ to, icon, name, desc, badge }) => (
          <Link
            key={to}
            to={to}
            className="panel p-6 group no-underline block transition-all duration-300
                       hover:border-gold-600/40 hover:-translate-y-1 hover:shadow-gold-md"
            style={{ textDecoration: 'none' }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200 inline-block">
                {icon}
              </span>
              <span
                className="font-cinzel text-gold-700 border border-gold-800/40 px-2 py-0.5 text-xs tracking-widest uppercase"
                style={{ fontSize: '0.55rem' }}
              >
                {badge}
              </span>
            </div>
            <h2 className="font-cinzel text-gold-400 text-lg tracking-widest uppercase mb-2 group-hover:text-gold-300 transition-colors">
              {name}
            </h2>
            <p className="font-cormorant italic text-gold-700 text-sm leading-relaxed">
              {desc}
            </p>
            <div className="mt-4 flex items-center gap-2 text-gold-600 group-hover:text-gold-400 transition-colors">
              <span className="font-cinzel text-xs uppercase tracking-widest" style={{ fontSize: '0.6rem' }}>
                Buka Cipher
              </span>
              <span className="text-xs group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom note */}
      <div className="text-center mt-12 pb-6">
        <div className="divider-gold max-w-sm mx-auto mb-4" />
        <p className="font-cormorant italic text-obsidian-500 text-sm tracking-wide">
          Semua operasi berjalan di browser — tidak ada data yang dikirim ke server.
        </p>
      </div>
    </div>
  )
}
