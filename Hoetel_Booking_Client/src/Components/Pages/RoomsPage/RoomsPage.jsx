// RoomsPage.js

import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RoomsPage.css';
import OurRoom from './OurRoom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { SlCalender } from "react-icons/sl";
import { AiOutlineUser } from "react-icons/ai";



const RoomsPage = () => {
    
    const [ourRooms, setOurRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 6;

    // Simulating fetching rooms data
    useEffect(() => {
        // Here, you can make an API call to fetch room data
        // Replace this logic with actual API call
        const fetchRooms = async () => {
            // Simulating fetching data from an API
            const response = await fetch('https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/rooms');
            const data = await response.json();
            setOurRooms(data);
        };

        fetchRooms();
    }, []);

    // Logic to get rooms for the current page
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = ourRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    
    const [startDate, setStartDate] = useState(new Date()); // State for check-in date
    const [endDate, setEndDate] = useState(new Date());



    return (
        <main>
            <section className="px-12 py-10 bg-rooms">
                <h3 className="text-center mt-12 text-white text-[25px] z-50">
                    <Link to="/" className="text-rose-500 font-bold">
                        Home
                    </Link>{' '}
                    / Rooms
                </h3>
            </section>

            <section className="px-12 py-14 bg-base-100">
                <h2 className="text-4xl text-start text-cyan-900 font-bold mb-16">Rooms</h2>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 col-span-2 gap-5">
                        {currentRooms.map((ourRoom) => (
                            <OurRoom key={ourRoom._id} ourRoom={ourRoom}></OurRoom>
                        ))}
                    </div>

                    <div className='bg-base-100 shadow-xl px-12 py-10'>
                        <h2 className='text-[#000] font-bold text-[25px] mb-10'>Check Availability</h2>

                        <form className="grid grid-cols-1  gap-12">
                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="checkInDate" className="text-gray-700 flex items-center gap-2 text-[20px] font-bold pb-4 border-b-2">  Arrival Date</label>
                                <div className='flex items-center justify-between'>
                                    <DatePicker id="checkInDate"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="d MMMM, yyyy"
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
                                        className="mt-2 w-full px-3 py-3 text-lg  border-0 rounded-md"
                                    /><SlCalender />
                                </div>
                            </div>

                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="adults" className="text-gray-700 text-[18px] flex items-center gap-2 font-bold border-b-2 pb-3"> <AiOutlineUser /> Adults</label>

                                <select name="" id="" className="mt-2 w-full px-3 py-3 text-xl border-none focus:border-0 rounded-md" 
                                    >
                                    <option value="1">1</option>
                                    <option value="1">2</option>
                                    <option value="1">4</option>
                                    <option value="1">5</option>
                                    <option value="1">6</option>
                                    <option value="1">7</option>
                                </select>

                            </div>

                            <div className="flex flex-col border-b-2 pb-3">
                                <label htmlFor="children" className="text-gray-700 text-[18px] flex items-center gap-2 font-bold border-b-2 pb-3"> <AiOutlineUser /> Children</label>

                                

                                <select name="" id="" className="mt-2 w-full px-3 py-3 text-xl border-none focus:border rounded-md" 
                                >
                                    <option value="1">1</option>
                                    <option value="1">2</option>
                                    <option value="1">3</option>
                                    <option value="1">4</option>
                                    <option value="1">5</option>
                                    <option value="1">6</option>
                                    <option value="1">7</option>
                                </select>
                                
                            </div>

                            <button type="submit" className="bg-[#b6af82] text-white px-6 py-4 rounded-md hover:bg-[#5AB9C1]"> Check Availability </button>
                        </form>


                    </div>


                </div>
            </section>

            {/* Pagination */}
            <ul className="flex justify-center py-3 pb-12 space-x-2 mt-4">
                {Array.from({ length: Math.ceil(ourRooms.length / roomsPerPage) }).map((_, index) => (
                    <li key={index}>
                        <button className="bg-rose-500 px-5 py-2 rounded hover:bg-rose-600 text-white focus:outline-none text-[20px]" onClick={() => paginate(index + 1)}>{index + 1}</button>
                    </li>
                ))}
            </ul>

        </main>
    );
};

export default RoomsPage;
