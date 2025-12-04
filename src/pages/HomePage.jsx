import { useEffect, useState } from 'react'
import Moviecard from "../component/MovieCard"
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const imageBaseUrl = "https://image.tmdb.org/t/p/w500" 

function HomePage() {
  const [ movies, setMovies ] = useState([])
  
  useEffect(() => {
    const options = {
      method: 'GET', 
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
      }
    };

    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(res => res.json())
      .then(data => {
        const filtered = data.results.filter(m => m.adult === false)
        setMovies(filtered)
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <>
      <div className="app">
        {/* 캐러셀 */}
        {movies.length > 5 && (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20} // 카드 사이 간격
            slidesPerView={5} // 한 화면에 보이는 카드 개수
            navigation // 좌우 화살표
            pagination={{ clickable: true }} // 하단 점 네비게이션
            loop={true} // 무한 루프
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <Moviecard 
                    title={movie.title}
                    posterUrl={imageBaseUrl + movie.poster_path}
                    rating={movie.vote_average}
                  />
                </Link>
              </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </>
  )
}

export default HomePage
