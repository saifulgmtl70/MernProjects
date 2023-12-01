import {  useLoaderData } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { BiChild } from "react-icons/bi";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { SlCalender } from "react-icons/sl";
import { AiOutlineUser } from "react-icons/ai";

import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { IoWifi } from "react-icons/io5";
import { IoLogoNoSmoking } from "react-icons/io5";
import { FaUmbrellaBeach  } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiRestaurantLine } from "react-icons/ri";
import { GiMuscleUp } from "react-icons/gi";
import { FaBath } from "react-icons/fa";

import { FaStar } from 'react-icons/fa';

import './SeeRoom.css';



import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {  useContext, useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from "../../Provider/AuthProvider";
// import axios from "axios";




const SeeRooms = () => {

    const [yourName, setYourname] = useState('')
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');

    const [reviews, setReviews] = useState([]);
    
    const [startDate, setStartDate] = useState(new Date()); // State for check-in date
    const [endDate, setEndDate] = useState(new Date());

    const [selectedRating, setSelectedRating] = useState(0);

    const { user } = useContext(AuthContext)

    // const [numOfDays, setNumOfDays] = useState(0)
    const rooms = useLoaderData();
    console.log(rooms);
    const roomId = rooms._id;
    console.log(roomId);


    // Slider Related
    function ThumbnailPlugin(mainRef) {
        return (slider) => {
          function removeActive() {
            slider.slides.forEach((slide) => {
              slide.classList.remove("active")
            })
          }
          function addActive(idx) {
            slider.slides[idx].classList.add("active")
          }
      
          function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
              slide.addEventListener("click", () => {
                if (mainRef.current) mainRef.current.moveToIdx(idx)
              })
            })
          }
      
          slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main) => {
              removeActive()
              const next = main.animator.targetIdx || 0
              addActive(main.track.absToRel(next))
              slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
          })
        }
    }

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
    })

    const [thumbnailRef] = useKeenSlider(
        {
          initial: 0,
          slides: {
            perView: 4,
            spacing: 10,
          },
        },
        [ThumbnailPlugin(instanceRef)]
    )
    


    //Bookings Related
    const handleBookingRoom = async(e) =>{
        e.preventDefault();
        const form = e.target;

        const room_name = rooms.name;
        const fullname = form.fullname.value;
        const email = form.email.value;
        const checkin = form.checkin.value;
        const checkout = form.checkout.value;
        const adults = form.adults.value;
        const children = form.children.value;
        
        const pricePerNight = rooms.price_per_night;
        console.log(pricePerNight);


        // geting the check in and check out date difference of days
        const calculateDays = (startDate, endDate) => {
            
            // get the ml second of the check in and checkout date
            const start = startDate.getTime();
            const end = endDate.getTime();

            
            // get the ml seond output  between check out and check in
            const difference = end - start;

            
            // Convert the ML second to day and math.cel this
            const days = Math.ceil(difference / (1000 * 3600 * 24));

            return days;
        };

        // call the calculateDays function
        const numOfDays = calculateDays(startDate, endDate);
        console.log('Number of days:', numOfDays);

        const grosTotal = pricePerNight * numOfDays;
        console.log(grosTotal);

     

        const bookings = {room_name,  fullname, email, checkin, checkout, adults, children, numOfDays,  grosTotal};
        console.log(bookings);


        // Check if the product already exists in the cart
            fetch(`https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/bookings?email=${user?.email}`, {
                method: 'GET',
                credentials: 'include',  // Include credentials in the request
            })
          .then((response) => response.json())
          .then((data) => {
            const existingProduct = data.find((item) => item.roomId === bookings.roomId);
            if (existingProduct) {
            
                toast.error("This room is already booked. You Can't book this room now")
            } 
            else {
              // If the room doesn't exist in the booking cart, so add it
              fetch('https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/bookings' , {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify(bookings),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  

                  toast.success('Your booking of this room hass ben sent')
                })
                .catch((error) => {
                  console.log(error);
                  toast.error('Something went wrong')

                });
            }
          })

            .catch((error) => {
                console.log(error);
                toast("Something went wrong...")
            });
        
         

    }




    const handleStarClick = (rating) => {
        setSelectedRating(rating);
    };


    const handleSubmitReview = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/rooms/${roomId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({yourName, reviewText, rating: selectedRating }),
            });

            if (response.ok) {
                // Review submitted successfully, update the UI or take necessary action
                // Fetch updated reviews or update the local state with the new review
                toast('Review submitted successfully');
                // Fetch updated reviews again to reflect changes
                const updatedReviewsResponse = await fetch(`/rooms/${roomId}/reviews`);
                const updatedReviewData = await updatedReviewsResponse.json();
                setReviews(updatedReviewData);
            } 
            else {
                // Handle error cases where the review submission failed
                toast('Failed to submit review');
            }
        } 

        catch (error) {
            toast('Error submitting review:', error);
        }
    };



  // Fetching and displaying reviews code
    useEffect(() => {
            const fetchReviewsForRoom = async () => {
            try {
                const response = await fetch(`https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/rooms/${roomId}/reviews`);
                const reviewData = await response.json();
                setReviews(reviewData);
            } 
            
            catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviewsForRoom(); // Fetch reviews on component mount or whenever roomId changes
    }, [roomId]);



    return (
        <main>
            <ToastContainer></ToastContainer>

            <section className="">

                <div ref={sliderRef} className="keen-slider h-full lg:h-[450px]">
                    <div className="keen-slider__slide  number-slide1" >
                        <img src="https://i.ibb.co/CtR0T0S/room-3-1-1920x800.jpg" alt="" className="w-full h-full "/>
                    </div>

                    <div className="keen-slider__slide number-slide2">
                        <img src="https://i.ibb.co/Kyd4159/twin-room-3-1-1920x800.jpg" className="h-full"  alt="" />
                    </div>

                    <div className="keen-slider__slide number-slide3">
                        <img src="https://i.ibb.co/P6w4v87/family-room-2-1-1920x800.jpg" alt="" />
                    </div>

                    <div className="keen-slider__slide number-slide4">
                        <img src="https://i.ibb.co/9tPxqK1/post-double-room-2-1-1920x800.jpg" alt="" />
                    </div>

                    <div className="keen-slider__slide number-slide5">
                        <img src="https://i.ibb.co/3CJy9hw/luxury-sitting-1-1920x800.jpg" alt="" />
                    </div>

                    <div className="keen-slider__slide number-slide6">
                        <img src="https://i.ibb.co/VBGr26L/room-2-1-1920x800.jpg" alt="" />
                    </div>
                    

                    <div className="keen-slider__slide number-slide7">
                        <img src="https://i.ibb.co/4WTdwZ4/room-5-1-1920x800.jpg" alt="" />
                    </div>
                </div>

                <div ref={thumbnailRef} className="keen-slider thumbnail h-full">

                    <div className="keen-slider__slide  number-slide1" >
                        <img src="https://i.ibb.co/CtR0T0S/room-3-1-1920x800.jpg" alt="" className=" "/>

                    </div>

                    <div className="keen-slider__slide number-slide2">
                        <img src="https://i.ibb.co/Kyd4159/twin-room-3-1-1920x800.jpg"  alt="" />
                    </div>

                    <div className="keen-slider__slide number-slide3">
                        <img src="https://i.ibb.co/P6w4v87/family-room-2-1-1920x800.jpg" alt="" />
                    </div>

                    <div className="keen-slider__slide number-slide4">
                        <img src="https://i.ibb.co/9tPxqK1/post-double-room-2-1-1920x800.jpg" alt="" />
                    </div>

                    <div className="keen-slider__slide number-slide5">
                        <img src="https://i.ibb.co/3CJy9hw/luxury-sitting-1-1920x800.jpg" alt="" />
                    </div>

                    <div className="keen-slider__slide number-slide6">
                        <img src="https://i.ibb.co/VBGr26L/room-2-1-1920x800.jpg" alt="" />
                    </div>
                    

                    <div className="keen-slider__slide number-slide7">
                        <img src="https://i.ibb.co/4WTdwZ4/room-5-1-1920x800.jpg" alt="" />
                    </div>

                </div>
            

            </section>

            <section className="py-2">
                <div className="flex items-center justify-between bg-[#FFF4EC] px-4 py-10 mb-12">
                    <h2 className="text-[#333] font-bold text-[19px] lg:text-[30px]"> {rooms.name} </h2>
                    <p>Price: <span> ${rooms.price_per_night} / Night </span></p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="col-span-2">
                        <div className="px-4 py-6 border flex items-center mx-5 w-auto gap-10 mb-6">
                            <p className="flex items-center gap-3 text-[20px] text-gray-500"> <CiUser className="text-[23px] text-gray-500 font-bold"></CiUser> {rooms.capacity.adults} Adults </p>
                            <p className="flex items-center gap-3 text-[20px] text-gray-500"> <BiChild className="text-[23px] text-gray-500 font-bold"></BiChild> {rooms.capacity.children} Adults </p>
                        </div>

                        <div className="mb-6 px-5">
                            <h2 className="text-[23px] font-bold text-[#000] pb-3 border-b-2 w-32 border-[#5AB9C1]">Description</h2>
                            <p className="mt-4 text-[#616161]">Refuel from your busy life with the indoor-outdoor lifestyle of the Andaman Terrace Rooms. Enjoy a generous 100 sqm space, including a bath situated by a stunning bay window for soothing sea views. Outside, your spacious terrace features two sun loungers and panoramic views of the Andaman Sea. Your balcony serves as a romantic retreat or even a play area for children with its ample space.</p>
                        </div>

                        <div className="mt-2 px-5">
                            <h2 className="text-[23px] font-bold text-[#000] mb-7 pb-3 border-b-2 w-full lg:w-32 border-[#5AB9C1]">FACILITIES</h2>
                            <div className="px-6 py-10 border rounded-sm">
                                <h4 className="text-[18px] text-[#000052] font-bold mb-5">Room Amenities</h4>
                                <div className="flex justify-between gap-8 items-center flex-wrap">
                                    <p className="flex text-[17px] items-center gap-2"> <LiaSwimmingPoolSolid />  Outdoor swimming pool</p>
                                    <p  className="flex text-[17px] items-center gap-2"> <IoWifi />Free wiffi</p>
                                    <p  className="flex text-[17px] items-center gap-2"> <IoLogoNoSmoking />  Non-smoking rooms</p>
                                    
                                    <p  className="flex text-[17px] items-center gap-2"> <FaUmbrellaBeach />  Beachfront</p>
                                

                                    <p  className="flex text-[17px] items-center gap-2"> <IoFastFoodOutline />  Superb breakfast</p>
                                    <p  className="flex text-[17px] items-center gap-2"> <RiRestaurantLine />  Restaurant</p>
                                    <p  className="flex text-[17px] items-center gap-2"> <GiMuscleUp />  Fitness center</p>

                                    <p  className="flex text-[17px] items-center gap-2"> <FaBath /> Attaced Washroom  </p>

                                </div>
                            </div>
                        </div>

                        <div className="mt-2 px-5">
                            <h2 className="text-[23px] font-bold text-[#000] mb-7 pb-3 border-b-2 w-32 border-[#5AB9C1]">FACILITIES</h2>
                            <div className="px-4 py-10 rounded-sm">
                                <h4 className="text-[18px] text-[#000052] font-bold mb-5">Single room information</h4>
                            </div>
                        </div>


                        <div className="space-y-4 px-5">

                            <details className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden" open >
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                    <h2 className="text-lg font-medium text-gray-900"> Will I be able to update my subscription details another time? </h2>

                                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                    </span>
                                </summary>

                                <p className="mt-4 leading-relaxed text-gray-700"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            </details>

                            <details className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden" open >
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                    <h2 className="text-lg font-medium text-gray-900">What types of photos should I upload? </h2>

                                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                    </span>
                                </summary>

                                <p className="mt-4 leading-relaxed text-gray-700"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            </details>


                            <details className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden" open >
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                    <h2 className="text-lg font-medium text-gray-900">What do I get with the commission I pay? </h2>

                                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                    </span>
                                </summary>

                                <p className="mt-4 leading-relaxed text-gray-700"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            </details>

                            
                        </div>




                        <div className="mt-5 py-7 px-5">
                            <h2 className="text-[23px] font-bold text-[#000] mb-7 pb-3 border-b-2 w-32 border-[#5AB9C1]">REVIEWS</h2>

                            <h3 className="text-[18px] pb-4 mb-12 border-b-2">Reviews</h3>


                            <div className="">
                                {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className="flex ms-0 lg:ms-10 gap-3 mb-7">
                                        <img src="https://i.ibb.co/yXhdswN/9a2c118417afedc43a7b15d000ff0861-s-70-d-mm-r-g.jpg" className=" rounded-full w-16 h-16" alt="" />
                                        <div>
                                            <h2 className="text-[19px] text-[#000] font-bold"> {review.yourName} </h2>
                                            <p className="text-[17px] text-[#666] mb-2 ">{review.reviewText} </p>
                                            
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        color={star <= review.rating ? '#ffc107' : '#e4e5e9'}
                                                    />
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                ))
                                ) : (
                                <h2>No reviews yet</h2>
                                )}
                            </div>

                            <div className="mt-10 gap-3 mb-5">

                                <h2 className="text-[19px] font-bold mb-3">Give Your important review here about this rom</h2>
                                <form onSubmit={handleSubmitReview} className="">

                                    <input type="text" className="w-full lg:w-7/12 block mb-6 py-3" placeholder="Enter name " value={yourName} onChange={(e) => setYourname(e.target.value)}/>

                                    <input type="text" className="w-full lg:w-7/12 block mb-6 py-3" placeholder="Enter valuable review" value={reviewText} onChange={(e) => setReviewText(e.target.value)}/>

                                    <input type="number" className="w-full lg:w-7/12 block mb-6 py-3"  placeholder="Rating (1-5)" value={rating} onChange={(e) => setRating(e.target.value)} />
                                    <div className="flex items-center gap-3 mb-5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            onClick={() => handleStarClick(star)}
                                            style={{ cursor: 'pointer' }}
                                            color={star <= selectedRating ? '#ffc107' : '#e4e5e9'}
                                        />
                                    ))}
                                        
                                    </div>

                                    <button type="submit" className="w-full lg:w-7/12 block bg-[#23AAF2] text-white mb-6 py-3">Submit Review</button>
                                </form>
                            </div>

                        </div>

                    </div>


                    <div className='bg-base-100 shadow-xl px-12 py-10'>
                        <h2 className='text-[#000] font-bold text-[25px] mb-10'>Booking Room Form</h2>

                        <form onSubmit={handleBookingRoom} className="grid grid-cols-1  gap-12">
                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="fullname" className="text-gray-700 text-[18px] flex items-center gap-2 font-bold border-b-2 pb-3"> Full Name </label>

                                <input type="text" name="fullname" placeholder="Enter your full name" className="mt-2 w-full px-3 py-3 text-xl border-none focus:outline-0 focus:border-0 rounded-md" />
                            </div>


                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="adults" className="text-gray-700 text-[18px] flex items-center gap-2 font-bold border-b-2 pb-3"> Email </label>

                                <input type="email" name="email" defaultValue={user?.email} placeholder="Enter your email address"  className="mt-2 w-full px-3 py-3 text-xl border-none focus:border-0 rounded-md" />
                            </div>


                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="checkInDate" className="text-gray-700 flex items-center gap-2 text-[20px] font-bold pb-4 border-b-2">  Arrival Date</label>
                                <div className='flex items-center justify-between'>
                                    <DatePicker id="checkInDate"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="d MMMM, yyyy"
                                        name="checkin"
                                        className="mt-2 w-full px-3 text-lg py-3 border-0 rounded-md"
                                    /><SlCalender />
                                </div>
                            </div>

                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="checkOutDate" className="text-gray-700 flex items-center gap-2 text-[20px] font-bold pb-4 border-b-2">  Departure Date</label>
                                <div className='flex items-center justify-between'>
                                    <DatePicker  id="checkOutDate" 
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="d MMMM, yyyy"
                                        name="checkout"
                                        className="mt-2 w-full px-3 py-3 text-lg  border-0 rounded-md"
                                    /><SlCalender />
                                </div>
                            </div>

                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="adults" className="text-gray-700 text-[18px] flex items-center gap-2 font-bold border-b-2 pb-3"> <AiOutlineUser /> Adults</label>

                                <select name="adults" id="" className="mt-2 w-full px-3 py-3 text-xl border-none focus:border-0 rounded-md" 
                                    >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>

                            </div>

                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="children" className="text-gray-700 text-[18px] flex items-center gap-2 font-bold border-b-2 pb-3"> <AiOutlineUser /> Children</label>

                                <select name="children" id="" className="mt-2 w-full px-3 py-3 text-xl border-none focus:border rounded-md" 
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                                
                            </div>

                            <button type="submit" className="bg-[#b6af82] text-white px-6 py-4 rounded-md hover:bg-[#5AB9C1]"> Book this Room </button>
                            
                        </form>

                    </div>

                </div>
            </section>
        </main>
    );
};

export default SeeRooms;