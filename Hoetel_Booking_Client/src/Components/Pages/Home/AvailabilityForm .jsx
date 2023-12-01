// AvailabilityForm.js

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { SlCalender } from "react-icons/sl";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from 'react';





const AvailabilityForm = () => {


    const [startDate, setStartDate] = useState(new Date()); // State for check-in date
    const [endDate, setEndDate] = useState(new Date());

  

 

  return (
        <div className="flex justify-center bg-base-200 shadow-2xl px-10 py-14 w-full  mx-auto mt-8">
             
            <form className="grid grid-cols-1 lg:grid-cols-5 gap-12 w-full">
                <div className="flex flex-col">
                    <label htmlFor="checkInDate" className="text-gray-700 flex items-center gap-2 text-[20px] font-bold"> <SlCalender /> Check-in Date</label>
                    <DatePicker id="checkInDate"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="d MMMM, yyyy"
                        className="mt-2 w-full px-3 text-lg py-3 border rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="checkOutDate" className="text-gray-700 flex items-center gap-2 text-[20px] font-bold"> <SlCalender /> Check-out Date</label>
                    <DatePicker  id="checkOutDate" 
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="d MMMM, yyyy"
                        className="mt-2 w-full px-3 py-3 text-lg border rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="adults" className="text-gray-700 text-[18px] flex items-center gap-2 font-bold"> <AiOutlineUser /> Adults</label>

                    

                    <select name="" id="" className="mt-2 w-full px-3 py-3 text-xl border-none focus:border rounded-md" 
                        >
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">4</option>
                        <option value="1">5</option>
                        <option value="1">6</option>
                        <option value="1">7</option>
                    </select>

                </div>

                <div className="flex flex-col">
                    <label htmlFor="children" className="text-gray-700 text-[18px] flex items-center gap-2 font-bold"> <AiOutlineUser /> Children</label>

                    

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

                <button type="submit" className="bg-[#b6af82] text-white px-4 py-3 rounded-md hover:bg-[#77714d]"> Check Availability </button>
            </form>

            
        </div>
  );
};

export default AvailabilityForm;
