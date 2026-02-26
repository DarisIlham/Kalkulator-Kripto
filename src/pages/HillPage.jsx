import { useState } from 'react'
import CipherLayout from '../components/CipherLayout.jsx'
import { hillEncrypt, hillDecrypt, parseMatrix } from '../utils/hill.js'

const DEFAULT_MATRIX = '6,24,1;13,16,10;20,17,15'

export default function HillPage() {
  const [matInput, setMatInput] = useState(DEFAULT_MATRIX)

  const matrix = parseMatrix(matInput)
  const isValid = matrix !== null

  return (
    <CipherLayout
      title="Hill Cipher 3×3"
      description="Cipher poligrafik berbasis perkalian matriks 3×3 dengan aritmetika mod 26"
      icon="⬡"
      onEncrypt={(text) => {
        if (!isValid) return 'Error: Matriks tidak valid'
        return hillEncrypt(text, matrix)
      }}
      onDecrypt={(text) => {
        if (!isValid) return 'Error: Matriks tidak valid'
        return hillDecrypt(text, matrix)
      }}
    >
      <div>
        <label className="label-text">Matriks Kunci 3×3</label>
        <input
          type="text"
          value={matInput}
          onChange={(e) => setMatInput(e.target.value)}
          placeholder="Contoh: 6,24,1;13,16,10;20,17,15"
        />
        <p className="font-cormorant italic text-gold-800 text-xs mt-1.5">
          Pisahkan nilai dengan koma (,) dan baris dengan titik-koma (;)
        </p>
      </div>

      {/* Matrix preview */}
      <div className="mt-4">
        <label className="label-text">
          Preview Matriks
          {!isValid && (
            <span className="ml-2 text-red-400 normal-case not-italic">— Format tidak valid</span>
          )}
        </label>

        {isValid ? (
          <div className="flex gap-3 items-start mt-2">
            {/* Bracket left */}
            <div className="flex flex-col justify-between self-stretch pt-1 pb-1">
              <span className="text-gold-600 text-xl leading-none">[</span>
              <span className="text-gold-600 text-xl leading-none">[</span>
            </div>
            <div className="inline-grid gap-1" style={{ gridTemplateColumns: 'repeat(3, 2.5rem)' }}>
              {matrix.flat().map((val, i) => (
                <div key={i} className="matrix-cell text-sm">
                  {val}
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between self-stretch pt-1 pb-1">
              <span className="text-gold-600 text-xl leading-none">]</span>
              <span className="text-gold-600 text-xl leading-none">]</span>
            </div>
          </div>
        ) : (
          <div className="inline-grid gap-1 mt-2" style={{ gridTemplateColumns: 'repeat(3, 2.5rem)' }}>
            {Array(9).fill('?').map((v, i) => (
              <div key={i} className="matrix-cell text-obsidian-500">?</div>
            ))}
          </div>
        )}
      </div>

      {/* Preset buttons */}
      <div className="mt-4">
        <label className="label-text">Preset Matriks</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {[
            { label: 'Default', val: '6,24,1;13,16,10;20,17,15' },
            { label: 'Sederhana', val: '1,2,3;0,1,4;5,6,0' },
            { label: 'Kuat', val: '17,21,2;17,18,2;5,21,19' },
          ].map(({ label, val }) => (
            <button
              key={label}
              onClick={() => setMatInput(val)}
              className={`btn-ghost px-3 py-1 rounded-sm text-xs ${matInput === val ? 'border-gold-500 text-gold-400' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </CipherLayout>
  )
}
