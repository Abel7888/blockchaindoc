import React from 'react'
import { Link } from 'react-router-dom'

function Card({ title, children, icon }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500/30 to-accent-500/30 border border-white/10" />
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="text-slate-300">{children}</div>
    </div>
  )
}

function Callout({ children, tone = 'info' }) {
  const tones = {
    info: 'bg-sky-950/40 text-sky-200 border-sky-700/40',
    success: 'bg-emerald-950/40 text-emerald-200 border-emerald-700/40',
    warn: 'bg-amber-950/40 text-amber-200 border-amber-700/40',
  }
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]} `}>{children}</div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-300 mt-2">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export default function Docs() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 bg-slate-950/70 border-b border-white/10">
        <nav className="container-custom flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500"></span>
            <span className="font-extrabold tracking-tight text-xl">Secure File</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="btn-primary">Open Dashboard</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="section">
        <div className="container-custom grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">Secure File: Blockchain-Powered Document Encryption for the Enterprise</h1>
            <p className="text-slate-300 text-lg">Our mission is simple: make sensitive data unbreakable, verifiable, and enterprise-ready.</p>
            <p className="text-slate-300">Secure File combines client-side encryption, decentralized storage, and blockchain-based integrity tracking to protect the world’s most valuable documents—whether in healthcare, finance, or enterprise operations. This page outlines the architecture, technologies, security model, and enterprise-readiness roadmap for Secure File.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h3 className="font-bold mb-3">High-Level Architecture</h3>
            <pre className="text-xs leading-5 whitespace-pre-wrap font-mono text-slate-300">
{`+--------------------+       +----------------------+       +--------------------+
|  Client (Browser)  |       |   IPFS/Filecoin      |       |  Ethereum (L2/L1)  |
| - AES-GCM Encrypt  |  PUT  | - Encrypted Blob     |  Tx   | - DocumentRegistry |
| - Hash (SHA-256)   |------>| - CID returned       |------>| - Hash, CID, meta  |
| - Key mgmt (MVP)   |       |                      |       | - Events           |
+--------------------+       +----------------------+       +--------------------+`}
            </pre>
            <div className="mt-4 grid gap-2">
              <Callout>End-to-End Encryption: Documents are encrypted client-side before leaving the device.</Callout>
              <Callout>Immutable Proof: Only encrypted blobs are stored on IPFS/Filecoin; blockchain records integrity and metadata.</Callout>
              <Callout>Zero Trust by Design: No plaintext, encryption keys, or sensitive identifiers ever touch the chain.</Callout>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <Section title="Technologies Used">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Frontend">
            React 18, Vite, Tailwind CSS.
          </Card>
          <Card title="Wallet & Blockchain">
            wagmi + viem, MetaMask, Sepolia testnet → future-ready for Ethereum L2s (Base, Arbitrum, Optimism).
          </Card>
          <Card title="Smart Contracts">
            Hardhat + ethers v6; <code>DocumentRegistry</code> records hash, CID, MIME, file size, and timestamp.
          </Card>
          <Card title="Storage">
            IPFS/Filecoin via web3.storage – encrypted data only.
          </Card>
          <Card title="Cryptography">
            WebCrypto API with AES-GCM for content and SHA-256 for integrity verification.
          </Card>
        </div>
      </Section>

      {/* Security Model */}
      <Section title="Security Model">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Confidentiality">AES-GCM client-side encryption ensures no unauthorized access.</Card>
          <Card title="Integrity">SHA-256 stored on-chain provides tamper-proof validation after decryption.</Card>
          <Card title="Access Control">MVP supports off-chain key sharing. Roadmap includes public-key encryption, policy-based access, and revocation.</Card>
          <Card title="Key Management">Keys remain with the client today; enterprises can bring KMS/HSM/MPC integrations tomorrow.</Card>
          <Card title="Privacy">Minimal metadata is written on-chain. No personal identifiers ever stored.</Card>
        </div>
      </Section>

      {/* Enterprise Roadmap */}
      <Section title="Enterprise Readiness Roadmap" subtitle="We’re building beyond encryption—towards a compliance-ready, enterprise-grade security platform.">
        <ol className="grid md:grid-cols-2 gap-6 list-decimal list-inside text-slate-300">
          <li className="rounded-xl border border-white/10 bg-slate-900 p-4">Granular Access Control: Role-based access, key wrapping (ECIES/RSA-OAEP), and on-chain access grants.</li>
          <li className="rounded-xl border border-white/10 bg-slate-900 p-4">Identity & SSO: Integration with OIDC/SAML, enterprise IdPs, and SCIM for provisioning.</li>
          <li className="rounded-xl border border-white/10 bg-slate-900 p-4">Observability: Audit logs, SIEM integrations (Splunk, Datadog), and blockchain event indexing.</li>
          <li className="rounded-xl border border-white/10 bg-slate-900 p-4">Compliance: HIPAA, SOC 2, ISO 27001 alignment with residency, retention, and encryption key lifecycle controls.</li>
          <li className="rounded-xl border border-white/10 bg-slate-900 p-4">Scalability & Cost Efficiency: L2 deployments, batched writes, relayers, and CDN-cached gateways.</li>
          <li className="rounded-xl border border-white/10 bg-slate-900 p-4">Key Custody Options: AWS KMS, Azure Key Vault, HSM integrations, or MPC wallets for enterprise-grade key security.</li>
        </ol>
      </Section>

      {/* Business Value */}
      <Section title="Why This Matters for Business Leaders">
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Healthcare">Protect PHI under HIPAA while enabling interoperable, patient-consented document sharing.</Card>
          <Card title="Finance">Safeguard contracts, audits, and transaction records with immutable integrity proofs.</Card>
          <Card title="Enterprises">Eliminate breach risks, reduce compliance costs, and increase customer trust with blockchain-backed verifiability.</Card>
        </div>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <Callout tone="success">✅ Risk Reduction – Encrypted end-to-end; data breaches have minimal impact</Callout>
          <Callout tone="success">✅ Resilience – Decentralized storage eliminates single points of failure</Callout>
          <Callout tone="success">✅ Trust & Transparency – Blockchain-backed audit trail of document history</Callout>
          <Callout tone="success">✅ Cost Efficiency – Ethereum L2s + decentralized storage keep costs predictable</Callout>
          <Callout tone="success">✅ No Vendor Lock-In – Open standards (IPFS, Ethereum) ensure long-term flexibility</Callout>
        </div>
      </Section>

      {/* Deployment Options */}
      <Section title="Deployment Options">
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Test Environments">Sepolia + IPFS via web3.storage</Card>
          <Card title="Production">Ethereum L2s with dedicated IPFS gateways, enterprise SSO, and KMS integration</Card>
          <Card title="Hybrid Mode">Private IPFS clusters for regulated industries, public blockchain anchoring for transparency</Card>
        </div>
      </Section>

      {/* Guidance for Technology Leaders */}
      <Section title="Guidance for Technology Leaders">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Architecture Fit">Modular – plug in your own storage, chain, or identity provider</Card>
          <Card title="Integration">REST/GraphQL APIs, webhooks for events, server-side automation</Card>
          <Card title="Security Posture">Zero-trust foundation, minimal on-chain footprint</Card>
          <Card title="Ops">Infrastructure-as-Code deployments, multi-region failover, enterprise-grade secrets management</Card>
        </div>
      </Section>

      {/* Bottom Line */}
      <Section title="The Bottom Line">
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <p className="text-slate-300">Secure File isn’t just about encrypting documents—it’s about redefining digital trust. For hospitals, banks, and global enterprises, this means less risk, more resilience, and unmatched transparency.</p>
          <p className="text-slate-300 mt-3">🚀 We are actively seeking enterprise partners and strategic investors to expand this platform. Be part of building the next generation of secure, blockchain-powered data protection.</p>
        </div>
      </Section>

      <footer className="border-t border-white/10">
        <div className="container-custom py-8 text-sm text-slate-400">
          © {new Date().getFullYear()} Secure File. Built for privacy-first organizations.
        </div>
      </footer>
    </div>
  )
}
