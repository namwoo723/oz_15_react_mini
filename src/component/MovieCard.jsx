export default function MovieCard({ title, rating, posterUrl }) {
  return (
    <div className="movie-card">
      <img className="poster" src={posterUrl} alt={title} />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-rating">평점: {rating}</p>
      </div>
    </div>
  )
}