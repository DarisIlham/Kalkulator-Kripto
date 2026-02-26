import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import VigenerePage from './pages/VigenerePage.jsx'
import AffinePage from './pages/AffinePage.jsx'
import PlayfairPage from './pages/PlayfairPage.jsx'
import HillPage from './pages/HillPage.jsx'
import EnigmaPage from './pages/EnigmaPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-obsidian-900 text-gold-300 font-cormorant">
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 40% at 50% -5%, rgba(201,168,76,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 40% 50% at 95% 85%, rgba(201,168,76,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 30% 40% at 5% 50%, rgba(201,168,76,0.03) 0%, transparent 55%)
          `,
        }}
      />

      {/* Corner ornaments */}
      {[
        'top-5 left-5 border-t border-l',
        'top-5 right-5 border-t border-r',
        'bottom-5 left-5 border-b border-l',
        'bottom-5 right-5 border-b border-r',
      ].map((cls, i) => (
        <div
          key={i}
          className={`fixed ${cls} w-12 h-12 pointer-events-none`}
          style={{ borderColor: 'rgba(201,168,76,0.2)' }}
        />
      ))}

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/vigenere"  element={<VigenerePage />} />
          <Route path="/affine"    element={<AffinePage />} />
          <Route path="/playfair"  element={<PlayfairPage />} />
          <Route path="/hill"      element={<HillPage />} />
          <Route path="/enigma"    element={<EnigmaPage />} />
          <Route path="*"          element={
            <div className="text-center py-24">
              <p className="font-cinzel-deco text-gold-500 text-3xl mb-4">404</p>
              <p className="font-cormorant italic text-gold-700 text-lg">Halaman tidak ditemukan.</p>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-8 pt-4">
        <div
          className="h-px max-w-sm mx-auto mb-4"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
        />
        <p className="font-cormorant italic text-obsidian-500 text-sm tracking-widest">
          Vigenere · Affine · Playfair · Hill 3×3 · Enigma
        </p>
      </footer>
    </div>
  )
}
