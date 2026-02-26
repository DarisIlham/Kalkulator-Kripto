/**
 * Hill Cipher (3x3)
 * Matrix-based polygraphic substitution cipher.
 */

import { modInverse } from './affine.js'

function det3(m) {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  )
}

function adjugate3(m) {
  return [
    [
      m[1][1] * m[2][2] - m[1][2] * m[2][1],
      -(m[0][1] * m[2][2] - m[0][2] * m[2][1]),
      m[0][1] * m[1][2] - m[0][2] * m[1][1],
    ],
    [
      -(m[1][0] * m[2][2] - m[1][2] * m[2][0]),
      m[0][0] * m[2][2] - m[0][2] * m[2][0],
      -(m[0][0] * m[1][2] - m[0][2] * m[1][0]),
    ],
    [
      m[1][0] * m[2][1] - m[1][1] * m[2][0],
      -(m[0][0] * m[2][1] - m[0][1] * m[2][0]),
      m[0][0] * m[1][1] - m[0][1] * m[1][0],
    ],
  ]
}

export function parseMatrix(input) {
  try {
    const rows = input.trim().split(';').map((row) =>
      row.split(',').map((v) => parseInt(v.trim()))
    )
    if (rows.length !== 3 || rows.some((r) => r.length !== 3)) return null
    if (rows.some((r) => r.some((v) => isNaN(v)))) return null
    return rows
  } catch {
    return null
  }
}

export function hillEncrypt(text, keyMatrix) {
  text = text.toUpperCase().replace(/[^A-Z]/g, '')
  while (text.length % 3 !== 0) text += 'X'
  let result = ''
  for (let i = 0; i < text.length; i += 3) {
    const v = [
      text.charCodeAt(i) - 65,
      text.charCodeAt(i + 1) - 65,
      text.charCodeAt(i + 2) - 65,
    ]
    for (let r = 0; r < 3; r++) {
      let s = 0
      for (let c = 0; c < 3; c++) s += keyMatrix[r][c] * v[c]
      result += String.fromCharCode(((s % 26) + 26) % 26 + 65)
    }
  }
  return result
}

export function hillDecrypt(text, keyMatrix) {
  const d = ((det3(keyMatrix) % 26) + 26) % 26
  const dInv = modInverse(d, 26)
  if (dInv === -1) return 'Error: Matriks tidak dapat diinvers mod 26'
  const adj = adjugate3(keyMatrix)
  const invMatrix = adj.map((row) =>
    row.map((v) => ((((v % 26) + 26) % 26) * dInv) % 26)
  )
  return hillEncrypt(text, invMatrix)
}
