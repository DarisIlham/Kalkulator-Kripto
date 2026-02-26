import { useState } from 'react'
import CipherLayout from '../components/CipherLayout.jsx'
import { vigEncrypt, vigDecrypt } from '../utils/vigenere.js'

export default function VigenerePage() {
  const [key, setKey] = useState('KUNCI')

  return (
    <CipherLayout
      title="Vigenere Cipher"
      description="Cipher polialfabetik klasik — setiap huruf digeser berdasarkan huruf kunci yang berulang"
      icon="🔑"
      onEncrypt={(text) => vigEncrypt(text, key)}
      onDecrypt={(text) => vigDecrypt(text, key)}
    >
      <div>
        <label className="label-text">Kata Kunci (Keyword)</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
          placeholder="Contoh: KUNCI"
          maxLength={26}
        />
        <p className="font-cormorant italic text-gold-800 text-xs mt-2 tracking-wide">
          Hanya huruf A–Z. Panjang kunci: {key.length || 0} karakter.
        </p>
      </div>

      {/* Key visualization */}
      {key.length > 0 && (
        <div className="mt-4">
          <label className="label-text">Visualisasi Kunci</label>
          <div className="flex flex-wrap gap-1 mt-1">
            {key.split('').map((char, i) => (
              <div
                key={i}
                className="matrix-cell text-xs font-cinzel"
                title={`Shift: ${char.charCodeAt(0) - 65}`}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      )}
    </CipherLayout>
  )
}
