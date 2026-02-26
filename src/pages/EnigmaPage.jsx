import { useState } from 'react'
import CipherLayout from '../components/CipherLayout.jsx'
import { enigmaProcess, ROTOR_CONFIGS } from '../utils/enigma.js'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function EnigmaPage() {
  const [settings, setSettings] = useState({
    rotors: ['1', '2', '3'],
    rings: ['A', 'A', 'A'],
    positions: ['A', 'A', 'A'],
  })

  const update = (key, index, value) => {
    setSettings((prev) => {
      const arr = [...prev[key]]
      arr[index] = value
      return { ...prev, [key]: arr }
    })
  }

  const process = (text) => enigmaProcess(text, settings)

  return (
    <CipherLayout
      title="Enigma Machine"
      description="Simulasi mesin Enigma 3-rotor — cipher simetris yang sama digunakan untuk enkripsi & dekripsi"
      icon="⚙"
      onEncrypt={process}
      onDecrypt={process}
      symmetric={false}
    >
      {/* Rotor selection */}
      <div className="mb-4">
        <label className="label-text">Pilihan Rotor (Kiri → Kanan)</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="label-text" style={{ fontSize: '0.52rem' }}>Rotor {i + 1}</label>
              <select
                value={settings.rotors[i]}
                onChange={(e) => update('rotors', i, e.target.value)}
              >
                {ROTOR_CONFIGS.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Ring settings */}
      <div className="mb-4">
        <label className="label-text">Ring Setting (Ringstellung)</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="label-text" style={{ fontSize: '0.52rem' }}>Ring {i + 1}</label>
              <select
                value={settings.rings[i]}
                onChange={(e) => update('rings', i, e.target.value)}
              >
                {ALPHABET.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Starting positions */}
      <div className="mb-2">
        <label className="label-text">Posisi Awal (Grundstellung)</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="label-text" style={{ fontSize: '0.52rem' }}>Posisi {i + 1}</label>
              <select
                value={settings.positions[i]}
                onChange={(e) => update('positions', i, e.target.value)}
              >
                {ALPHABET.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Settings display */}
      <div className="panel bg-obsidian-950/80 p-3 mt-3">
        <p className="font-cinzel text-gold-700 text-xs uppercase tracking-widest mb-2">Konfigurasi Aktif</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-gold-800/25 p-2">
              <div className="font-cinzel text-gold-400 text-base font-bold">
                {settings.positions[i]}
              </div>
              <div className="font-cormorant italic text-gold-700 text-xs mt-0.5">
                R{settings.rotors[i]} · {settings.rings[i]}
              </div>
            </div>
          ))}
        </div>
        <p className="font-cormorant italic text-gold-800 text-xs mt-2 text-center">
          ⚙ Enkripsi dan dekripsi menggunakan konfigurasi yang sama
        </p>
      </div>
    </CipherLayout>
  )
}
