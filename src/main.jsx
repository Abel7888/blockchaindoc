import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Docs from './routes/Docs.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './wallet.jsx'
import './index.css'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  </React.StrictMode>
)
