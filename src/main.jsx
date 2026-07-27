import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AlbumProvider } from './context/AlbumContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AlbumProvider>
          <App />
        </AlbumProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
