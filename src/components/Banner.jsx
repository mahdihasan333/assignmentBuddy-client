import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import slider1 from '../assets/image/slider1.avif'
import slider2 from '../assets/image/slider2.avif'
import slider3 from '../assets/image/slider3.jpg'
import slider4 from '../assets/image/slider4.avif'



const Banner = () => {
  return (
    <div className="py-10">
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
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={slider1}
            text="Learn Together, Succeed Together!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={slider2}
            text="Your Gateway to Collaborative Success"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={slider3}
            text="Join Hands, Share Knowledge, Excel Together"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={slider4}
            text="Share Ideas, Solve Problems, Succeed"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
