import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import PokeApp from './routers/PokeApp'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <PokeApp />
  </HashRouter>,
)
