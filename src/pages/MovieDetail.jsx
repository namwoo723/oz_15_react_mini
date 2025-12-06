import { useEffect, useState } from "react"
import "../styles/MovieDetail.scss"
import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"

const imageBaseUrl = "https://image.tmdb.org/t/p/w500" 

export default function MovieDetail() {
  const { id } = useParams()

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  );

  if (loading) return <div>로딩 중...</div>

  if (error) return <div>에러 발생</div>

  const genreNames = data.genres.map((g) => g.name).join(", ")

  return (
    <div className="movie-detail">
      <div className="poster-wrap">
        <img
          className="poster"
          src={imageBaseUrl + data.poster_path}
          alt={data.title}
        />
      </div>

      <div className="info-wrap">
        <div className="title">
          <h2>{data.title}</h2>
          <span>{data.vote_average}</span>
        </div>
        <div className="genres">{genreNames}</div>
        <div className="overview">{data.overview}</div>
      </div>
    </div>
  )
}
