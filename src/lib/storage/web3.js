import { Web3Storage } from 'web3.storage'

export function getWeb3Client() {
  const token = import.meta.env.VITE_WEB3_STORAGE_TOKEN
  if (!token) return null
  return new Web3Storage({ token })
}

// Uploads a single encrypted Blob (as a File) and returns its CID
export async function uploadEncryptedBlob(name, blob, onStoredChunk) {
  const client = getWeb3Client()
  const file = new File([blob], name, { type: 'application/octet-stream' })
  if (!client) {
    // Demo mode: simulate progress and return a fake CID
    const total = file.size || blob.size || 1
    // Simulate chunked upload progress
    const chunks = 5
    const chunkSize = Math.ceil(total / chunks)
    for (let i = 0; i < chunks; i++) {
      // allow UI to update
      await new Promise((r) => setTimeout(r, 150))
      try { onStoredChunk && onStoredChunk(Math.min(chunkSize, total - i * chunkSize)) } catch {}
    }
    const demoCid = `demo-${Math.random().toString(36).slice(2, 10)}`
    return demoCid
  }
  const cid = await client.put([file], {
    wrapWithDirectory: false,
    onStoredChunk, // (size) => {}
  })
  return cid
}
