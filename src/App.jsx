import './App.scss'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './component/Layout'
import MovieDetail from './pages/MovieDetail'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
  )
}

export default App
