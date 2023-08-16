import { Link } from "react-router-dom";
import {getCookie} from "../../helpers/cookie";
import "./Home.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from 'swiper/modules';
import 'animate.css';
import slide1 from "../../image/slide1.png"
import slide2 from "../../image/slide2.png"
import slide3 from "../../image/slide3.png"
import slide4 from "../../image/slide4.png"
import slide5 from "../../image/slide5.png"


function Home() {
    const token = getCookie("token");
    return(
        <>
        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
      spaceBetween={50}
      centeredSlides={true}
      slidesPerView={1}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="animate__animated animate__backInDown"
    >
      <SwiperSlide>
        <div className="home__slide">
        <img src={slide1}/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="home__slide"> 
        <img src={slide2}/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="home__slide">
        <img src={slide3}/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="home__slide">
        <img src={slide4}/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="home__slide">
        <img src={slide5}/>
        </div>
      </SwiperSlide>
    </Swiper>
        </>
    )
}

export default Home;