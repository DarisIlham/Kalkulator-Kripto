import { useState } from 'react'
import CipherLayout from '../components/CipherLayout.jsx'
import { playfairEncrypt, playfairDecrypt, buildPlayfairMatrix } from '../utils/playfair.js'

export default function PlayfairPage() {
  const [key, setKey] = useState('KRIPTOGRAFI')

  const matrix = buildPlayfairMatrix(key || 'A')

  return (
    <CipherLayout
      title="Playfair Cipher"
      description="Cipher digraf — mengenkripsi pasangan huruf menggunakan matriks kunci 5×5"
      icon="⊞"
      onEncrypt={(text) => playfairEncrypt(text, key)}
      onDecrypt={(text) => playfairDecrypt(text, key)}
    >
      <div>
        <label className="label-text">Kata Kunci (I = J)</label>
        <input
          type="text"
          value={key}
          onChange={(e) =>
            setKey(e.target.value.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, ''))
          }
          placeholder="Contoh: KRIPTOGRAFI"
        />
      </div>

      {/* 5x5 Matrix preview */}
      <div className="mt-4">
        <label className="label-text">Matriks Kunci 5×5</label>
        <div className="inline-grid gap-1 mt-2" style={{ gridTemplateColumns: 'repeat(5, 2.25rem)' }}>
          {matrix.flat().map((char, i) => (
            <div
              key={i}
              className="matrix-cell"
            >
              {char}
            </div>
          ))}
        </div>
        <p className="font-cormorant italic text-gold-800 text-xs mt-2">
          Huruf J digabung dengan I. Teks input juga akan otomatis mengganti J → I.
        </p>
      </div>
    </CipherLayout>
  )
}
