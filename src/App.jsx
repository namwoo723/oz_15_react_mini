import { useEffect, useState } from 'react'
import movieListData from "./movieListData.json"
import Moviecard from "./component/MovieCard"
import './App.scss'
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
        {/* 캐러셀 */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10} // 카드 사이 간격
          slidesPerView={5} // 한 화면에 보이는 카드 개수
          navigation // 좌우 화살표
          pagination={{ clickable: true }} // 하단 점 네비게이션
          loop={true} // 무한 루프
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Moviecard 
                title={movie.title}
                posterUrl={imageBaseUrl + movie.poster_path}
                rating={movie.vote_average}
              />
            </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  )
}

export default App
