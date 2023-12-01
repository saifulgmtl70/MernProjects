// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, } from 'swiper/modules';
import './Home.css'
import { FaArrowLeft, FaArrowRight  } from "react-icons/fa";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const HomeSlider = () => {

    

    return (
        <div>
            <Swiper spaceBetween={50} 
            className='relative group'
            slidesPerView={1}
            modules={[Navigation]}
            navigation={{
                nextEl: ".button-next-slide",
                prevEl: ".button-prev-slide"
            }}
            // pagination={{ clickable: true }}
           

                
                >
                <SwiperSlide>
                    <div className='image relative'>
                        <img src="https://i.ibb.co/qm3FsVH/fernando-alvarez-rodriguez-M7-Gdd-Pq-Jowg-unsplash.jpg" className=' opacity-90 h-[500px] w-full' alt="" />
                        <div className='content absolute z-50 bg-[#272518] opacity-80 flex flex-col items-center justify-center w-full top-0 left-0 bottom-0 text-white text-center'>
                            <span className='text-white text-[20px] font-extrabold '>Our Favourite Room</span>
                            <h3 className='text-[70px]'>Hotel Master Room</h3>
                            <button className='px-12 py-6  rounded-md text-[#ff4301] bg-[#fffefd] '>Room Suites</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='image relative'>
                        <img src="https://i.ibb.co/d4WFz80/manuel-moreno-DGa0-LQ0y-DPc-unsplash.jpg" className=' opacity-90 h-[470px] w-full' alt="" />
                        <div className='content absolute z-50 bg-[#272518] opacity-80 flex flex-col items-center justify-center w-full h-full top-0 left-0 text-white text-center'>
                            <span className='text-white text-[20px] font-extrabold '>Our Favourite Room</span>
                            <h3 className='text-[70px] font-extrabold '>Hotel Master Room</h3>
                            <button className='px-12 py-4 rounded-md text-[#ff4301] bg-[#fffefd]'>Room Suites</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='image relative'>
                        <img src="https://i.ibb.co/WcTrJGn/sara-dubler-Koei-7y-Yt-Io-unsplash.jpg" className=' opacity-90 h-[470px] w-full' alt="" />
                        <div className= 'content absolute z-50 bg-[#272518] opacity-80 flex flex-col items-center justify-center w-full h-full top-0 left-0 text-white text-center'>
                        <span className='text-white text-[20px] font-extrabold '>Our Favourite Room</span>
                            <h3 className='text-[70px] font-extrabold '>Hotel Master Room</h3>
                            <button className='px-12 py-4 rounded-md text-[#ff4301] bg-[#fffefd]'>Room Suites</button>
                        </div>
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className='image relative'>
                        <img src="https://i.ibb.co/ccx1bdH/sasha-kaunas-x-Ea-Aoiz-NFV8-unsplash.jpg" className=' opacity-90 h-[470px] w-full' alt="" />
                        <div className='content absolute z-50 bg-[#272518] opacity-80 flex flex-col items-center justify-center w-full h-full top-0 left-0 text-white text-center' >
                        <span className='text-white text-[20px] font-extrabold'>Our Favourite Room</span>
                            <h3 className='text-[70px] font-extrabold'>Hotel Master Room</h3>
                            <button className='px-12 py-4 rounded-md text-[#ff4301] bg-[#fffefd]'>Room Suites</button>
                        </div>
                    </div>
                </SwiperSlide>

        

                    <div className='button-next-slide absolute top-[50%] z-10 group-hover:left-0 -left-[23rem] duration-500 w-[45px] h-[45px] text-[#ff4301] text-3xl bg-[#fff] grid place-items-center '>
                    <FaArrowRight />
               </div>


                <div className='button-prev-slide absolute  top-[50%] z-10 group-hover:right-0 -right-[23rem] duration-500 w-[45px] h-[45px] text-3xl text-[#ff4301] bg-[#fff] grid place-items-center '>
                    {""}
                    <FaArrowLeft />
               </div>
               
              
               

            </Swiper>
        </div>
    );
};

export default HomeSlider;