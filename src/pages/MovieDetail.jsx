import { useState } from "react"
import movieDetailData from "../movieDetailData.json"
import "../styles/MovieDetail.scss"

const imageBaseUrl = "https://image.tmdb.org/t/p/w500" 

export default function MovieDetail() {
  const [details] = useState(movieDetailData)

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
