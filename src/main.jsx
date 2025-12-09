import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SupabaseProvider } from './supabase'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <SupabaseProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </SupabaseProvider>
)
