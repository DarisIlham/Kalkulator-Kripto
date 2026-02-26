/**
 * Vigenere Cipher
 * Polyalphabetic substitution cipher using a keyword.
 */

export function vigEncrypt(text, key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, '')
  if (!key) return text
  let result = '', ki = 0
  for (const c of text.toUpperCase()) {
    if (/[A-Z]/.test(c)) {
      result += String.fromCharCode(
        (c.charCodeAt(0) - 65 + key.charCodeAt(ki % key.length) - 65) % 26 + 65
      )
      ki++
    } else {
      result += c
    }
  }
  return result
}

export function vigDecrypt(text, key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, '')
  if (!key) return text
  let result = '', ki = 0
  for (const c of text.toUpperCase()) {
    if (/[A-Z]/.test(c)) {
      result += String.fromCharCode(
        (c.charCodeAt(0) - 65 - (key.charCodeAt(ki % key.length) - 65) + 26) % 26 + 65
      )
      ki++
    } else {
      result += c
    }
  }
  return result
}
