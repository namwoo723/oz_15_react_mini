import { useEffect, useState } from "react"
import "../styles/MovieDetail.scss"
import { useParams } from "react-router-dom"

const imageBaseUrl = "https://image.tmdb.org/t/p/w500" 

export default function MovieDetail() {
  const [details, setDetails] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`  
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        setDetails(data)
      })
      .catch(err => console.error(err));
  }, [id])

  if (!details) {
    return <div className="movie-detail">로딩 중...</div>
  }

  const genreNames = details.genres.map((g) => g.name).join(", ")

  return (
    <div className="movie-detail">
      <div className="poster-wrap">
        <img
          className="poster"
          src={imageBaseUrl + details.poster_path}
          alt={details.title}
        />
      </div>

      <div className="info-wrap">
        <div className="title">
          <h2>{details.title}</h2>
          <span>{details.vote_average}</span>
        </div>
        <div className="genres">{genreNames}</div>
        <div className="overview">{details.overview}</div>
      </div>
    </div>
  )
}
