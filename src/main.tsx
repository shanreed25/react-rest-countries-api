import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* keeps the route in the URL hash (#/country/FRA) */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
