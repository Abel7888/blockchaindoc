import React from 'react'
import { Link } from 'react-router-dom'
import { ConnectWalletButton } from '../wallet.jsx'
import { generateAesGcmKey, encryptFile, sha256, toHex } from '../lib/crypto/aesgcm.js'
import { uploadEncryptedBlob } from '../lib/storage/web3.js'
// On-chain registration temporarily disabled to ensure Dashboard renders reliably

export default function Dashboard() {
  const [file, setFile] = React.useState(null)
  const [status, setStatus] = React.useState('Idle')
  const [progress, setProgress] = React.useState(0)
  const [result, setResult] = React.useState(null)
  const inputRef = React.useRef(null)
  // const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

  async function handleUpload() {
    if (!file) return
    try {
      setStatus('Preparing...')
      setProgress(0)
      setResult(null)

      // Hash plaintext for integrity record (MVP: full file in memory)
      const plainBytes = new Uint8Array(await file.arrayBuffer())
      const hash = await sha256(plainBytes)
      const hashHex = toHex(hash)

      setStatus('Encrypting...')
      const key = await generateAesGcmKey()
      const enc = await encryptFile(file, key, 1024 * 1024)

      setStatus('Uploading to IPFS (web3.storage)...')
      let uploaded = 0
      const cid = await uploadEncryptedBlob(
        `${file.name}.enc`,
        enc.cipherBlob,
        (size) => {
          uploaded += size
          // Best-effort progress (put packs file into chunks internally)
          const total = enc.cipherBlob.size || file.size
          setProgress(Math.min(100, Math.round((uploaded / total) * 100)))
        }
      )

      setResult({
        cid,
        name: file.name,
        size: file.size,
        mime: file.type || 'application/octet-stream',
        hashHex,
      })
      setStatus('Done')
    } catch (e) {
      console.error(e)
      setStatus(`Error: ${e.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Shell */}
      <div className="grid grid-cols-12 min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex md:col-span-3 xl:col-span-2 border-r border-white/10 bg-slate-950/70 backdrop-blur">
          <div className="w-full p-6 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />
              <span className="font-extrabold tracking-tight text-xl">Secure File</span>
            </Link>

            <nav className="mt-2 flex flex-col gap-1 text-sm">
              <div className="px-2 text-slate-400 uppercase tracking-widest text-[11px]">Main</div>
              <Link className="px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-2" to="/dashboard">
                <span className="h-2 w-2 rounded-full bg-accent-500" /> Overview
              </Link>
              <button disabled className="px-3 py-2 rounded-lg text-left text-slate-400/80 cursor-not-allowed">Upload</button>
              <button disabled className="px-3 py-2 rounded-lg text-left text-slate-400/80 cursor-not-allowed">My Documents</button>
              <button disabled className="px-3 py-2 rounded-lg text-left text-slate-400/80 cursor-not-allowed">Inbox</button>
            </nav>

            <div className="mt-auto pt-4 border-t border-white/10">
              <ConnectWalletButton />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-12 md:col-span-9 xl:col-span-10">
          {/* Header */}
          <div className="relative overflow-hidden border-b border-white/10">
            <div className="absolute -inset-16 bg-gradient-to-tr from-primary-600/20 to-accent-600/20 blur-3xl" />
            <div className="relative px-6 sm:px-10 py-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">Dashboard</h1>
                <p className="text-slate-300 mt-1">Encrypt, store and manage your documents securely.</p>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/" className="btn-outline">Back to Home</Link>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <section className="container-custom py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { k: 'Documents', v: '0', sub: 'Registered' },
              { k: 'Storage', v: '0 MB', sub: 'Encrypted' },
              { k: 'Shares', v: '0', sub: 'Granted' },
              { k: 'Network', v: 'Sepolia', sub: 'Testnet' },
            ].map((m) => (
              <div key={m.k} className="rounded-xl border border-white/10 bg-slate-900 p-5">
                <div className="text-sm text-slate-400">{m.k}</div>
                <div className="mt-1 text-2xl font-bold">{m.v}</div>
                <div className="text-slate-400 text-xs">{m.sub}</div>
              </div>
            ))}
          </section>

          {/* Actions & lists */}
          <section className="container-custom pb-12 grid lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />
                <h2 className="text-xl font-bold">Upload encrypted</h2>
              </div>
              <p className="text-slate-300 mb-4">Encrypt locally, upload to IPFS/Filecoin, record on-chain (next step).</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  ref={inputRef}
                  type="file"
                  className="block w-full text-sm text-slate-300 file:mr-3 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-500"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button onClick={handleUpload} disabled={!file} className={`btn-primary ${!file ? 'opacity-60 cursor-not-allowed' : ''}`}>Encrypt & Upload</button>
              </div>
              <div className="mt-3 text-sm text-slate-400">Status: {status}</div>
              {status.includes('Uploading') && (
                <div className="mt-2 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-accent-600 h-2" style={{ width: `${progress}%` }} />
                </div>
              )}
              {result && (
                <div className="mt-4 text-sm">
                  <div className="text-slate-400">CID</div>
                  <div className="truncate font-mono text-slate-200">{result.cid}</div>
                  <div className="mt-2 text-slate-400">SHA-256 (plaintext)</div>
                  <div className="truncate font-mono text-slate-200">{result.hashHex}</div>
                  <div className="mt-4 text-yellow-400">On-chain registration is temporarily disabled. Encryption + IPFS upload are working.</div>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary-600/40 border border-white/10" />
                <h2 className="text-xl font-bold">Recent documents</h2>
              </div>
              <ul className="text-sm divide-y divide-white/5">
                {['— No documents yet —'].map((t) => (
                  <li key={t} className="py-2 flex items-center justify-between text-slate-400">
                    <span>{t}</span>
                    <span className="text-xs">CID • size</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent-600/40 border border-white/10" />
                <h2 className="text-xl font-bold">Inbox</h2>
              </div>
              <p className="text-slate-300 mb-2">Documents shared with you (key-wrapped).</p>
              <p className="text-slate-400 text-sm">Coming soon.</p>
            </div>
          </section>

          <footer className="border-t border-white/10">
            <div className="container-custom py-8 text-sm text-slate-400">© {new Date().getFullYear()} Secure File</div>
          </footer>
        </main>
      </div>
    </div>
  )
}
