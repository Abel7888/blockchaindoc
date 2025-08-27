import React from 'react'
import { Link } from 'react-router-dom'
import { ConnectWalletButton } from './wallet.jsx'

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 bg-slate-950/70 border-b border-white/10">
      <nav className="container-custom flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500"></span>
          <span className="font-extrabold tracking-tight text-xl">Secure File</span>
        </a>
        <div className="hidden md:flex items-center gap-6 font-medium text-slate-200">
          <a href="#about" className="hover:text-white">About Us</a>
          <a href="#platform" className="hover:text-white">Our Platform</a>
          <a href="#how" className="hover:text-white">How it Works</a>
          <a href="#use-cases" className="hover:text-white">Use Cases</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/docs" className="btn-outline">Documentation</Link>
          <Link to="/dashboard" className="btn-primary">Open Dashboard</Link>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)', backgroundSize: '22px 22px'}} />
      <div className="container-custom grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500">Web3 • Encryption • Decentralized</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Secure, Decentralized File Security, Storage & Sharing
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Secure File leverages blockchain and advanced cryptography to protect your data end‑to‑end on a decentralized network. You decide who can access your files — no central authority, no single point of failure.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#platform" className="btn-primary">Explore Platform</a>
            <a href="#how" className="btn-outline">How it Works</a>
          </div>
          <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-sm text-slate-300">
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-accent-500"></span>Privacy‑focused encryption</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-accent-500"></span>Decentralized & reliable storage</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-accent-500"></span>Incentivized ecosystem</li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-primary-600/30 to-accent-600/30 blur-3xl rounded-3xl"/>
          <div className="relative rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="aspect-[4/3] rounded-lg bg-slate-800 grid place-items-center text-slate-300">
              <div className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500" />
                <p className="font-semibold">End‑to‑End Encryption</p>
                <p className="text-sm text-slate-400">Your files, your keys, your control.</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg border border-white/10 bg-slate-800 p-3">
                <p className="font-bold text-white">3x</p>
                <p className="text-slate-400">Redundancy</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-800 p-3">
                <p className="font-bold text-white">0</p>
                <p className="text-slate-400">Single points</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-800 p-3">
                <p className="font-bold text-white">100%</p>
                <p className="text-slate-400">User control</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container-custom">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent-500">{eyebrow}</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
        </div>
        <div className="prose prose-invert max-w-none">
          {children}
        </div>
      </div>
    </section>
  )
}

function Platform() {
  return (
    <Section id="platform" eyebrow="Our Platform" title="Web3‑powered, privacy‑first file platform">
      <div className="grid md:grid-cols-3 gap-6 not-prose">
        <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <h3 className="text-lg font-bold mb-2">Privacy‑focused encryption</h3>
          <p className="text-slate-300">Advanced cryptographic techniques protect data before it leaves your device, ensuring only you and trusted parties can decrypt.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <h3 className="text-lg font-bold mb-2">Decentralized and reliable storage</h3>
          <p className="text-slate-300">Files are dispersed across a decentralized network for durability and uptime—no single point of failure.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <h3 className="text-lg font-bold mb-2">Incentivized ecosystem</h3>
          <p className="text-slate-300">Token‑aligned incentives encourage reliable storage providers, ensuring performance and resilience.</p>
        </div>
      </div>
      <p className="mt-6 text-slate-300">Secure file provides a robust solution for privacy-focused data management, ideal for vast industries such as healthcare, IoT, legal services, and enterprises needing secure, decentralized file sharing. Our advanced cryptographic techniques and decentralized approach ensure that your data remains safe and accessible only to you and anybody that you want to share with.</p>
    </Section>
  )
}

function HowItWorks() {
  return (
    <Section id="how" eyebrow="How it works" title="From encryption to retrieval — simple and secure">
      <ol className="grid md:grid-cols-3 gap-6 not-prose list-decimal list-inside">
        <li className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <h3 className="text-lg font-bold mb-2">File Dispersal, Encryption & Security</h3>
          <p className="text-slate-300">Files are encrypted client‑side, sliced into shards, and erasure‑coded for durability before being distributed across nodes.</p>
        </li>
        <li className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <h3 className="text-lg font-bold mb-2">Decentralized Storage</h3>
          <p className="text-slate-300">Shards are stored across independent storage providers. The blockchain coordinates integrity and availability guarantees.</p>
        </li>
        <li className="rounded-xl border border-white/10 bg-slate-900 p-6">
          <h3 className="text-lg font-bold mb-2">Secure Access & Retrieval</h3>
          <p className="text-slate-300">Users retrieve and decrypt shards using their keys. Access controls and sharing policies ensure only authorized parties can read data.</p>
        </li>
      </ol>
    </Section>
  )
}

function UseCases() {
  const items = [
    {
      title: 'Healthcare',
      text: 'Secure and privacy-focused patient data sharing across healthcare providers, ensuring sensitive medical information is accessible only to authorized personnel.'
    },
    {
      title: 'Legal Services',
      text: 'Manage and store sensitive legal documents securely, enabling controlled access for legal professionals, reducing the risk of unauthorized access.'
    },
    {
      title: 'Enterprise Collaboration',
      text: 'Facilitate secure file sharing and collaboration across different departments, branches, or external business partners, ensuring data integrity and privacy.'
    },
    {
      title: 'Supply Chain Management',
      text: 'Transparent and secure sharing of supply chain documents between stakeholders, ensuring data authenticity and reducing fraud risks.'
    },
    {
      title: 'Data Backup',
      text: 'Decentralized, resilient data backup solution to protect critical data from loss, with redundant copies across multiple nodes to ensure availability.'
    },
  ]

  return (
    <Section id="use-cases" eyebrow="Use cases" title="Built for real‑world, privacy‑critical workflows">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
        {items.map((uc) => (
          <div key={uc.title} className="rounded-xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-3 h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />
            <h3 className="text-lg font-bold mb-2">{uc.title}</h3>
            <p className="text-slate-300">{uc.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function About() {
  return (
    <Section id="about" eyebrow="About us" title="Secure File — your data, your control">
      <p className="text-slate-300">We are building a decentralized, privacy‑first file platform powered by Web3. Our mission is to make secure, user‑controlled data sharing simple and accessible—without compromising privacy or resilience.</p>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let’s talk security & privacy">
      <form className="not-prose grid gap-4 max-w-xl">
        <div className="grid md:grid-cols-2 gap-4">
          <input className="w-full rounded-lg bg-slate-900 border border-white/10 px-4 py-3 outline-none focus:border-accent-600" placeholder="Full name" />
          <input type="email" className="w-full rounded-lg bg-slate-900 border border-white/10 px-4 py-3 outline-none focus:border-accent-600" placeholder="Email address" />
        </div>
        <input className="w-full rounded-lg bg-slate-900 border border-white/10 px-4 py-3 outline-none focus:border-accent-600" placeholder="Company / Organization (optional)" />
        <textarea rows={5} className="w-full rounded-lg bg-slate-900 border border-white/10 px-4 py-3 outline-none focus:border-accent-600" placeholder="Your message"></textarea>
        <div className="flex items-center gap-3">
          <button type="button" className="btn-primary">Send message</button>
          <span className="text-slate-400 text-sm">(Form is non‑functional for now)</span>
        </div>
      </form>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} Secure File. All rights reserved.</p>
        <div className="text-sm text-slate-400">Made with Web3, encryption, and Tailwind CSS.</div>
      </div>
    </footer>
  )
}

export default function App() {
  React.useEffect(() => {
    // smooth scroll for internal links
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Platform />
      <HowItWorks />
      <UseCases />
      <Contact />
      <Footer />
    </div>
  )
}
