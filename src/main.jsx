import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MovieDetail from './pages/MovieDetail.jsx'
import Layout from './component/Layout.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
