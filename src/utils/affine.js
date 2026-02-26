/**
 * Affine Cipher
 * E(x) = (ax + b) mod 26
 * D(x) = a_inv * (x - b) mod 26
 */

export function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

export function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x
  }
  return -1
}

export const VALID_A_VALUES = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]

export function affineEncrypt(text, a, b) {
  a = parseInt(a)
  b = parseInt(b)
  if (gcd(a, 26) !== 1) return "Error: 'a' harus coprime dengan 26"
  return text
    .toUpperCase()
    .replace(/[A-Z]/g, (c) =>
      String.fromCharCode(((a * (c.charCodeAt(0) - 65) + b) % 26) + 65)
    )
}

export function affineDecrypt(text, a, b) {
  a = parseInt(a)
  b = parseInt(b)
  const aInv = modInverse(a, 26)
  if (aInv === -1) return "Error: 'a' tidak memiliki modular inverse"
  return text
    .toUpperCase()
    .replace(/[A-Z]/g, (c) =>
      String.fromCharCode(
        ((aInv * (c.charCodeAt(0) - 65 - b + 260)) % 26) + 65
      )
    )
}
