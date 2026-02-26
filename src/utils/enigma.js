/**
 * Enigma Machine (simplified 3-rotor simulation)
 * Historically based on the Wehrmacht Enigma I configuration.
 * Note: Enigma is symmetric — encrypt and decrypt use the same function.
 */

export const ROTOR_CONFIGS = [
  { id: 1, name: 'Rotor I',   wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', notch: 'Q' },
  { id: 2, name: 'Rotor II',  wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE', notch: 'E' },
  { id: 3, name: 'Rotor III', wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO', notch: 'V' },
]

export const REFLECTOR_B = 'YRUHQSLDPXNGOKMIEBFZCWVJAT'

export function enigmaProcess(text, settings) {
  const { rotors, rings, positions } = settings
  text = text.toUpperCase().replace(/[^A-Z]/g, '')

  const selectedRotors = rotors.map((r) => ROTOR_CONFIGS[parseInt(r) - 1])
  const p = positions.map((pos) => pos.charCodeAt(0) - 65)
  const ring = rings.map((r) => r.charCodeAt(0) - 65)

  let result = ''
  for (const ch of text) {
    // Step rotors (double-stepping mechanism)
    const atNotch = [
      p[0] === selectedRotors[0].notch.charCodeAt(0) - 65,
      p[1] === selectedRotors[1].notch.charCodeAt(0) - 65,
      p[2] === selectedRotors[2].notch.charCodeAt(0) - 65,
    ]
    if (atNotch[1]) {
      p[0] = (p[0] + 1) % 26
      p[1] = (p[1] + 1) % 26
    } else if (atNotch[2]) {
      p[1] = (p[1] + 1) % 26
    }
    p[2] = (p[2] + 1) % 26

    let c = ch.charCodeAt(0) - 65

    // Forward pass (right to left)
    for (let i = 2; i >= 0; i--) {
      const shift = (p[i] - ring[i] + 26) % 26
      c = (selectedRotors[i].wiring.charCodeAt((c + shift) % 26) - 65 - shift + 26) % 26
    }

    // Reflector
    c = REFLECTOR_B.charCodeAt(c) - 65

    // Backward pass (left to right)
    for (let i = 0; i < 3; i++) {
      const shift = (p[i] - ring[i] + 26) % 26
      c = (selectedRotors[i].wiring.indexOf(String.fromCharCode(((c + shift) % 26) + 65)) - shift + 26) % 26
    }

    result += String.fromCharCode(c + 65)
  }
  return result
}
