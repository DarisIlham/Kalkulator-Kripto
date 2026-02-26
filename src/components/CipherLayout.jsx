import { useState } from 'react'

/**
 * CipherLayout — shared wrapper for all cipher pages.
 * Props:
 *  - title: string
 *  - description: string
 *  - icon: string (emoji or symbol)
 *  - onEncrypt: (text) => string
 *  - onDecrypt: (text) => string
 *  - children: key config inputs
 *  - symmetric: bool — if true, shows only one "Process" button (e.g. Enigma)
 */
export default function CipherLayout({
  title,
  description,
  icon,
  onEncrypt,
  onDecrypt,
  children,
  symmetric = false,
}) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleEncrypt = () => {
    setOutput(onEncrypt(input))
    setMode('encrypt')
  }
  const handleDecrypt = () => {
    setOutput(onDecrypt(input))
    setMode('decrypt')
  }
  const handleProcess = () => {
    setOutput(onEncrypt(input))
    setMode('process')
  }

  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const handleSwap = () => {
    if (!output) return
    setInput(output)
    setOutput('')
    setMode(null)
  }

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">{icon}</div>
        <h1 className="font-cinzel-deco text-2xl md:text-3xl gold-text mb-2">{title}</h1>
        <p className="font-cormorant italic text-gold-700 text-base tracking-wide">{description}</p>
        <div className="divider-gold mt-4 max-w-xs mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left column: config + input */}
        <div className="flex flex-col gap-4">
          {/* Key Configuration */}
          <div className="panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gold-500 text-xs">✦</span>
              <span className="font-cinzel text-gold-500 uppercase tracking-widest text-xs">
                Konfigurasi Kunci
              </span>
            </div>
            {children}
          </div>

          {/* Input */}
          <div className="panel p-5">
            <label className="label-text">Teks Input</label>
            <textarea
              className="min-h-[120px] resize-y leading-relaxed italic"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Masukkan teks di sini…"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {symmetric ? (
              <button
                className="btn-gold flex-1 px-6 py-3 rounded-sm"
                onClick={handleProcess}
              >
                ⟳ Proses
              </button>
            ) : (
              <>
                <button
                  className="btn-gold flex-1 px-6 py-3 rounded-sm"
                  onClick={handleEncrypt}
                >
                  ▲ Enkripsi
                </button>
                <button
                  className="btn-ghost flex-1 px-6 py-3 rounded-sm"
                  onClick={handleDecrypt}
                >
                  ▼ Dekripsi
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right column: output */}
        <div className="flex flex-col gap-4">
          <div className="panel p-5 flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="font-cinzel text-gold-500 uppercase tracking-widest text-xs">
                {mode === 'encrypt' ? '▲ Output Enkripsi'
                  : mode === 'decrypt' ? '▼ Output Dekripsi'
                  : mode === 'process' ? '⟳ Output Proses'
                  : 'Output'}
              </span>
              <div className="flex gap-2">
                {output && (
                  <button
                    onClick={handleSwap}
                    title="Gunakan output sebagai input"
                    className="font-cinzel text-gold-700 hover:text-gold-400 text-xs uppercase tracking-wider
                               border border-gold-800/30 hover:border-gold-600/50 px-2 py-1 transition-all duration-200"
                  >
                    ⇄ Swap
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className={`font-cinzel text-xs uppercase tracking-wider px-2 py-1 transition-all duration-200
                    border ${copied
                      ? 'border-gold-500 text-gold-400 bg-gold-900/20'
                      : 'border-gold-800/30 text-gold-700 hover:border-gold-600/50 hover:text-gold-400'
                    }`}
                >
                  {copied ? '✓ Tersalin' : 'Salin'}
                </button>
              </div>
            </div>
            <hr className="divider-gold" />
            {output ? (
              <div className="result-box mt-3 animate-slide-up">{output}</div>
            ) : (
              <div className="mt-3 p-4 border border-dashed border-gold-900/40 text-center">
                <p className="font-cormorant italic text-obsidian-500 text-sm">
                  Hasil akan muncul di sini…
                </p>
              </div>
            )}
          </div>

          {/* Info box */}
          <div className="panel p-4 bg-obsidian-900/50">
            <p className="font-cinzel text-gold-700 text-xs uppercase tracking-widest mb-2">Catatan</p>
            <p className="font-cormorant text-gold-600 text-md leading-relaxed italic">
              Input non-alfabet akan dihapus secara otomatis. Semua karakter akan dikonversi ke huruf kapital.
              {symmetric && ' Enigma bersifat simetris — proses yang sama untuk enkripsi dan dekripsi.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
