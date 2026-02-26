import { useState } from 'react'
import CipherLayout from '../components/CipherLayout.jsx'
import { affineEncrypt, affineDecrypt, VALID_A_VALUES } from '../utils/affine.js'

export default function AffinePage() {
  const [a, setA] = useState('5')
  const [b, setB] = useState('8')

  return (
    <CipherLayout
      title="Affine Cipher"
      description="Cipher matematis dengan fungsi enkripsi E(x) = (ax + b) mod 26"
      icon="∑"
      onEncrypt={(text) => affineEncrypt(text, a, b)}
      onDecrypt={(text) => affineDecrypt(text, a, b)}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text">Nilai a (coprime 26)</label>
          <select value={a} onChange={(e) => setA(e.target.value)}>
            {VALID_A_VALUES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text">Nilai b (0–25)</label>
          <input
            type="number"
            min="0"
            max="25"
            value={b}
            onChange={(e) => {
              const val = Math.min(25, Math.max(0, parseInt(e.target.value) || 0))
              setB(String(val))
            }}
          />
        </div>
      </div>

      {/* Formula display */}
      <div className="mt-4 panel bg-obsidian-950/80 p-3">
        <p className="font-cinzel text-gold-700 text-xs uppercase tracking-widest mb-1">Fungsi Aktif</p>
        <p className="font-cormorant italic text-gold-400 text-base">
          E(x) = ({a}x + {b}) mod 26
        </p>
        <p className="font-cormorant italic text-gold-600 text-sm mt-1">
          D(x) = a⁻¹ × (x − {b}) mod 26
        </p>
      </div>
    </CipherLayout>
  )
}
