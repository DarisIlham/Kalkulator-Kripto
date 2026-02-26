/**
 * Playfair Cipher
 * Digraph substitution cipher using a 5x5 key matrix (I/J combined).
 */

export function buildPlayfairMatrix(key) {
  key = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '')
  const seen = new Set()
  const chars = []
  for (const c of key + 'ABCDEFGHIKLMNOPQRSTUVWXYZ') {
    if (!seen.has(c)) {
      seen.add(c)
      chars.push(c)
    }
  }
  const matrix = []
  for (let i = 0; i < 5; i++) matrix.push(chars.slice(i * 5, i * 5 + 5))
  return matrix
}

function findPosition(matrix, c) {
  for (let r = 0; r < 5; r++)
    for (let col = 0; col < 5; col++)
      if (matrix[r][col] === c) return [r, col]
  return [-1, -1]
}

function preparePairs(text) {
  text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '')
  const pairs = []
  let i = 0
  while (i < text.length) {
    const a = text[i]
    let b = text[i + 1]
    if (!b || a === b) {
      b = 'X'
      i++
    } else {
      i += 2
    }
    pairs.push([a, b])
  }
  return pairs
}

export function playfairEncrypt(text, key) {
  const matrix = buildPlayfairMatrix(key)
  const pairs = preparePairs(text)
  return pairs
    .map(([a, b]) => {
      const [ar, ac] = findPosition(matrix, a)
      const [br, bc] = findPosition(matrix, b)
      if (ar === br) return matrix[ar][(ac + 1) % 5] + matrix[br][(bc + 1) % 5]
      if (ac === bc) return matrix[(ar + 1) % 5][ac] + matrix[(br + 1) % 5][bc]
      return matrix[ar][bc] + matrix[br][ac]
    })
    .join('')
}

export function playfairDecrypt(text, key) {
  const matrix = buildPlayfairMatrix(key)
  text = text.toUpperCase().replace(/[^A-Z]/g, '')
  const pairs = []
  for (let i = 0; i < text.length; i += 2) {
    pairs.push([text[i], text[i + 1] || 'X'])
  }
  return pairs
    .map(([a, b]) => {
      const [ar, ac] = findPosition(matrix, a)
      const [br, bc] = findPosition(matrix, b)
      if (ar === br) return matrix[ar][(ac + 4) % 5] + matrix[br][(bc + 4) % 5]
      if (ac === bc) return matrix[(ar + 4) % 5][ac] + matrix[(br + 4) % 5][bc]
      return matrix[ar][bc] + matrix[br][ac]
    })
    .join('')
}
