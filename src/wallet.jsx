import React from 'react'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [sepolia],
  transports: {
    // Use env RPC if provided, otherwise fall back to a public Sepolia RPC
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL || 'https://rpc.sepolia.org'),
  },
  connectors: [injected()],
  ssr: false,
})

export function WalletProvider({ children }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}

export function ConnectWalletButton() {
  const [hasEthereum, setHasEthereum] = React.useState(true)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && !window.ethereum) setHasEthereum(false)
  }, [])

  return (
    <a
      href="#"
      onClick={async (e) => {
        e.preventDefault()
        if (!window.ethereum) {
          window.open('https://metamask.io/download/', '_blank')
          return
        }
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
        } catch (err) {
          console.error(err)
        }
      }}
      className="btn-outline"
      title={hasEthereum ? 'Connect MetaMask' : 'Install MetaMask'}
    >
      {hasEthereum ? 'Connect Wallet' : 'Install MetaMask'}
    </a>
  )
}
