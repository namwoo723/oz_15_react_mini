import Moviecard from "../component/MovieCard"
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const imageBaseUrl = "https://image.tmdb.org/t/p/w500" 

function HomePage() {
  const { data, loading, error } = useFetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
  );
  
  if (loading) return <div>로딩 중...</div>

  if (error) return <div>에러 발생</div>

  const movies = data?.results.filter(m => !m.adult) || [];

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
