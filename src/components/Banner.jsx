import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../assets/image/slider1.avif'
import bgimg2 from '../assets/image/slider2.avif'
import bgimg3 from '../assets/image/slider3.jpg'
import bgimg4 from '../assets/image/slider4.avif'



const Banner = () => {
  return (
    <div className="container px-6 py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text="Learn Together, Succeed Together!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text="Your Gateway to Collaborative Success"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text="Join Hands, Share Knowledge, Excel Together"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg4}
            text="Share Ideas, Solve Problems, Succeed"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
