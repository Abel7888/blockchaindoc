// WebCrypto AES-GCM utilities with chunked file encrypt/decrypt
// Browser-only; uses window.crypto.subtle

// ===== Basic helpers =====
export async function sha256(bytes) {
  const buf = await crypto.subtle.digest('SHA-256', bytes)
  return new Uint8Array(buf)
}

export function toHex(bytes) {
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function concatUint8(arrays) {
  const total = arrays.reduce((n, a) => n + a.length, 0)
  const out = new Uint8Array(total)
  let offset = 0
  for (const a of arrays) {
    out.set(a, offset)
    offset += a.length
  }
  return out
}

// ===== Key management =====
export async function generateAesGcmKey() {
  return await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )
}

export async function exportRawKey(key) {
  const raw = await crypto.subtle.exportKey('raw', key)
  return new Uint8Array(raw)
}

export async function importRawKey(rawBytes) {
  return await crypto.subtle.importKey(
    'raw',
    rawBytes,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt']
  )
}

// ===== Non-chunked (small payloads) =====
export async function encryptBytes(plainBytes, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    plainBytes
  )
  return { cipher: new Uint8Array(cipherBuf), iv }
}

export async function decryptBytes(cipherBytes, key, iv) {
  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    cipherBytes
  )
  return new Uint8Array(plainBuf)
}

// ===== Chunked encrypt/decrypt for files =====
// We derive per-chunk IVs from a baseIV: first 8 bytes random, last 4 bytes big-endian counter.
function deriveIv(baseIv, counter) {
  const iv = new Uint8Array(12)
  iv.set(baseIv.subarray(0, 8), 0)
  // big-endian 32-bit counter in last 4 bytes
  iv[8] = (counter >>> 24) & 0xff
  iv[9] = (counter >>> 16) & 0xff
  iv[10] = (counter >>> 8) & 0xff
  iv[11] = counter & 0xff
  return iv
}

export async function encryptFile(file, key, chunkSize = 1024 * 1024) { // 1MB default
  const baseIv = crypto.getRandomValues(new Uint8Array(12))
  const chunks = []
  let offset = 0
  let index = 0

  while (offset < file.size) {
    const end = Math.min(offset + chunkSize, file.size)
    const slice = file.slice(offset, end)
    const plain = new Uint8Array(await slice.arrayBuffer())
    const iv = deriveIv(baseIv, index)
    const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain)
    chunks.push(new Uint8Array(cipherBuf))
    offset = end
    index += 1
  }

  const cipherBlob = new Blob(chunks, { type: 'application/octet-stream' })
  return {
    cipherBlob,
    baseIv, // store alongside the CID; required for decryption
    chunkSize,
    chunks: index,
    size: file.size,
    mime: file.type || 'application/octet-stream',
  }
}

export async function decryptFile(cipherBlob, key, baseIv, chunkSize) {
  // Read the blob in sequential chunks of the encrypted output size.
  // Since AES-GCM appends a 16-byte tag per chunk, the encrypted chunk length differs from plaintext length.
  // We cannot infer boundaries without stored boundaries. For MVP, we will read the entire blob into memory and decrypt in one shot if chunkSize is not provided.

  if (!chunkSize) {
    // Single-shot decrypt assumes it was encrypted without chunking.
    const cipher = new Uint8Array(await cipherBlob.arrayBuffer())
    // When chunking is unknown, baseIv must be the exact IV used.
    const plain = await decryptBytes(cipher, key, baseIv)
    return new Blob([plain])
  }

  const outParts = []
  let offset = 0
  let index = 0

  // We don't know per-chunk encrypted lengths unless we recompute by encrypting lengths.
  // To keep MVP simple, during encryption we keep chunkSize fixed so that each plaintext chunk is at most chunkSize.
  // Encrypted length per chunk = chunkPlainLength + 16 (GCM tag)
  while (offset < cipherBlob.size) {
    const expectedPlainLen = Math.min(chunkSize, Number.MAX_SAFE_INTEGER)
    const approxCipherLen = expectedPlainLen + 16 // works for all except the last chunk where plain may be smaller (still ok)
    const end = Math.min(offset + approxCipherLen, cipherBlob.size)
    const slice = cipherBlob.slice(offset, end)
    const cipher = new Uint8Array(await slice.arrayBuffer())
    const iv = deriveIv(baseIv, index)
    const plain = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher))
    outParts.push(plain)
    offset = end
    index += 1
  }

  return new Blob(outParts)
}
