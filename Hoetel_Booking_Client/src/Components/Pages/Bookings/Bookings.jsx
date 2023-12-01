import { Link } from 'react-router-dom';
import './Bookings.css';
import { AuthContext } from '../../Provider/AuthProvider';
import { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import Swal from 'sweetalert2'

import { ImCancelCircle } from "react-icons/im";

const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    // const [rooms, setRooms] = useState([])

    const url = `https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/bookings?email=${user?.email}`;

    useEffect(() =>{
        axios.get(url, {withCredentials: true})
        .then(res => {
            setBookings(res.data);
        })
    },[url]);

    const handleDelete = (_id) =>{
        console.log(_id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            //   

            fetch(`https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/bookings/${_id}`,{
                method: 'DELETE',
                
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                if(data.deletedCount > 0){
                    Swal.fire(
                        'Deleted!',
                        'Your Cart Data has been deleted.',
                        'success'
                    )
                    // eslint-disable-next-line react/prop-types
                    const remaining = bookings.filter(cart => cart._id !== _id);
                    setBookings(remaining);
                }
            })

            }
        });



    }



    return (
        <main>
            <section className="px-12 py-10 bg-bookings">
                <h3 className="text-center mt-12 text-white text-[25px] z-50">
                    <Link to="/" className="text-rose-500 font-bold">
                        Home
                    </Link>
                    / Bookings
                </h3>
            </section>

            <section className='px-12 py-10 bg-[#fafafa]'>
                <h2 className='text-4xl text-cyan-950 font-bold text-center mb-14'>Your Bookings</h2>

                <div className="mx-auto w-full">   

                    <div className="">
                            {bookings.length === 0 ? (
                                <h2 className="text-center text-rose-500 font-medium text-3xl">Your booking Cart is empty</h2>
                            ) : (
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="text-xl text-cyan-900">
                                            <td>Action</td>
                                            <th>Room</th>
                                            <th>Capacity</th>
                                            <th>Check in Date</th>
                                            <th>Check out date Title</th>
                                            <th>Day/Night</th>
                                            <th>Gross Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr className="text-lg" key={booking._id}>
                                                <td className='flex items-center gap-10'>
                                                    <button onClick={() => handleDelete(booking._id)} className=" text-rose-500 rounded-sm text-3xl"> <ImCancelCircle /> </button>
                                                </td>
                                                <td> <Link to={`/seerooom/`} className='text-cyan-800 font-bold hover:text-[rose-500 duration-700]'> {booking.room_name} </Link> </td>
                                                <td> 
                                                    <p>{booking.adults} Adults</p>
                                                    <p>{booking.children} Children</p>
                                                </td>
                                                <td> {booking.checkin} </td>
                                                <td> {booking.checkout} </td>
                                                <td> {booking.numOfDays} </td>
                                                <td> ${booking.grosTotal} </td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                    </div>  
                             
                </div>



            </section>
            
        </main>
    );
};

export default Bookings;