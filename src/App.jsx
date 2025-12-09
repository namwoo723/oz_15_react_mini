import './App.scss'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './component/Layout'
import MovieDetail from './pages/MovieDetail'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
      </Route>
    </Routes>
  )
}

export default App
