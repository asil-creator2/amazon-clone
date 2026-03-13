import { Swiper, SwiperSlide } from "swiper/react"
import {hero1,hero2,hero3,hero4} from '../assets/index'
import "swiper/css"
import "swiper/css/pagination"

import { Autoplay, Pagination } from "swiper/modules"

const Hero = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className="w-full h-[400px]"
    >
      <SwiperSlide>
        <img
          src={hero1}
          alt="slide1"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={hero2}
          alt="slide2"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={hero3}
          alt="slide3"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={hero4}
          alt="slide4"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  )
}

export default Hero