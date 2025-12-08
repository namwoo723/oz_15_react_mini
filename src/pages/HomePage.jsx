import Moviecard from "../component/MovieCard"
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const imageBaseUrl = "https://image.tmdb.org/t/p/w500" 

function HomePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // 검색어 유무에 따라 API URL 분기
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1&include_adult=false`
    : 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

  const { data, loading, error } = useFetch(url);
  
  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러 발생</div>

  const movies = (data?.results || []).filter(m => !m.adult);

  if (movies.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div className="app">
      {/* 캐러셀 */}
      {movies.length > 5 && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            // 모바일 (세로, 작은 기기)
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // 작은 태블릿 ~ 가로 모바일 (sm)
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            // 일반 태블릿 (md)
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // 작은 데스크탑 (lg)
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            // 큰 데스크탑 (xl 이상)
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
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
  )
}

export default HomePage
