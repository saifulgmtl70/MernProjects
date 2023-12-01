import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, } from 'swiper/modules';
import './Home.css'
import { FaHandPointLeft  , FaHandPointRight    } from "react-icons/fa";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const OurFacilites = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className='w-11/12 space-y-10  my-20'>
                <h2 className='text-[65px] text-[#2F2D2C]'>Our Facilities</h2>
                <p className='text-[18px] leading-loose'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, id ipsam neque sint porro eaque perspiciatis iste aut soluta possimus explicabo magni ad unde error quas. Cum magni odit et!</p>

                <button className='text-white  bg-[#6BBFB5] px-20 py-8 text-[18px] rounded-sm'>Discover More</button>
            </div>

            <div  className='w-11/12'>
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
                        <div className='image'>
                            <img src="https://i.ibb.co/6J6gHk1/facilities-1.jpg" className=' hover:-translate-y-1 ease-in-out duration-1000 transition-transform hover:scale-95 text-start opacity-90 h-[470px] w-full ' alt="" />
                            <div className='content'>
                                <h3 className='text-[20px] text-slate-800 font-bold hover:text-[#6BBFB5] duration-500 text-center lg:text-start p-4'>Spa & Message</h3>
                            </div>
                        </div>
                    </SwiperSlide>

                    
                    <SwiperSlide>
                        <div className='image'>
                            <img src="https://i.ibb.co/D4WSkvx/facilities-3-1.jpg" className=' hover:-translate-y-1 ease-in-out duration-1000 transition-transform hover:scale-95 text-start opacity-90 h-[470px] w-full ' alt="" />
                            <div className='content'>
                                <h3 className='text-[20px] text-slate-800 font-bold hover:text-[#6BBFB5] duration-500 text-center lg:text-start p-4'>Restaurent</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                        <div className='image'>
                            <img src="https://i.ibb.co/6J6gHk1/facilities-1.jpg" className=' hover:-translate-y-1 ease-in-out duration-1000 transition-transform hover:scale-95 text-start opacity-90 h-[470px] w-full ' alt="" />
                            <div className='content'>
                                <h3 className='text-[20px] text-slate-800 font-bold hover:text-[#6BBFB5] duration-500 text-center lg:text-start p-4'>Spa & Message</h3>
                            </div>
                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div className='image'>
                            <img src="https://i.ibb.co/D4WSkvx/facilities-3-1.jpg" className=' hover:-translate-y-1 ease-in-out duration-1000 transition-transform hover:scale-95 text-start opacity-90 h-[470px] w-full ' alt="" />
                            <div className='content'>
                                <h3 className='text-[20px] text-slate-800 font-bold hover:text-[#6BBFB5] duration-500 text-center lg:text-start p-4'>Restaurent</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    





                    <div className='button-next-slide absolute  top-[50%] z-10 group-hover:right-0 -right-[23rem] duration-500 w-[45px] h-[45px] text-3xl text-[#ff4301] bg-[#fff] grid place-items-center '>
                        <FaHandPointLeft  />
                    </div>

                    <div className='button-prev-slide absolute top-[50%] z-10 group-hover:left-0 -left-[23rem] duration-500 w-[45px] h-[45px] text-[#ff4301] text-3xl bg-[#fff] grid place-items-center '>
                        
                        <FaHandPointRight  />
                    </div>


                    
                
                
                

                </Swiper>
            </div>

        </div>
    );
};

export default OurFacilites;