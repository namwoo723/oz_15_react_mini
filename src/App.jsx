import { useEffect, useState } from 'react'
import movieListData from "./movieListData.json"
import Moviecard from "./component/MovieCard"
import './App.css'

const imageBaseUrl = "https://image.tmdb.org/t/p/w500" 

function App() {
  const [ movies, setMovies ] = useState([])
  
  useEffect(() => {
    // const fetchAPI = async () => {
    //   const response = await fetch("https://image.tmdb.org/t/p/w500" )
    //   const data = await response.json()
    // }
    setMovies(movieListData.results)
  }, [])

  return (
    <>
      <div className="app">
        <div className="movie-list">
          {movies.map((movie) => (
            <Moviecard 
              key={movie.id} 
              title={movie.title}
              posterUrl={imageBaseUrl + movie.poster_path}
              rating={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
