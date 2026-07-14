import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import "@fontsource/alexandria/400.css";
import "@fontsource/alexandria/500.css";
import "@fontsource/alexandria/700.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </StrictMode>,
)
