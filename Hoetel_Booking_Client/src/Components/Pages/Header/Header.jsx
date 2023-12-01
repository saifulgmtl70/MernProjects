import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { RiHotelBedLine } from "react-icons/ri";

import { FaUserCircle,  } from 'react-icons/fa';
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Header = () => {
  
    const [isOpen, setIsOpen] = useState(false);
    const {user, logOut} = useContext(AuthContext);

    const handleLogOut = () =>{
      logOut()
      .then(() =>{
        toast("Logged Out Successfully");
      })

      .catch(() =>{
        toast("Something Went Wrong")
      })
    }

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

  const navlinks = <>
  <Link to="/" className="px-3 py-2 mx-3 mt-2 text-cyan-900 transition-colors duration-300 transform  lg:mt-0  hover:text-rose-500" >Home</Link>

  <Link to="/rooms" className="px-3 py-2 mx-3 mt-2 text-cyan-900 transition-colors duration-300 transform  lg:mt-0  hover:text-rose-500 ">Rooms</Link>

  <Link to="/blogs" className="px-3 py-2 mx-3 mt-2 text-cyan-900 transition-colors duration-300 transform  lg:mt-0  hover:text-rose-500 ">Blogs</Link>

  {user && <Link to="/bookings" className="px-3 py-2 mx-3 mt-2 text-cyan-900 transition-colors duration-300 transform  lg:mt-0  hover:text-rose-500 ">Bookings</Link>}

  <Link to="/contact" className="px-3 py-2 mx-3 mt-2 text-cyan-900 transition-colors duration-300 transform  lg:mt-0  hover:text-rose-500 ">Contact</Link>
</>

  return (
    <nav className="relative bg-white shadow-md top-0 sticky z-20 dark:bg-gray-800">
      <ToastContainer></ToastContainer>
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/" className="logo">
              <h2 className="flex items-center gap-2 font-extrabold text-cyan-950">  <RiHotelBedLine className="text-5xl font-extrabold" /> <p className="text-3xl"> LuxBeach Hotel </p> </h2>
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button onClick={toggleMenu} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                {!isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className={`${isOpen ? 'block h-screen' : 'hidden'} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center text-center`}>
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 ">
              {navlinks}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center mx-auto justify-center lg:justify-normal lg:mx-8 text-center">
              

              {
                user ?

                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                          <div className="rounded-full mx-auto">
                              {/* <img src={user.photo} alt="" /> */}
                              <FaUserCircle className="text-4xl text-center"></FaUserCircle>
                          </div>
                  </label>
                <ul tabIndex={0} className="mt-3 z-10 shadow menu menu-sm dropdown-content bg-base-100 rounded-md w-auto p-5 text-end space-y-5">
                    <h3 className="text-xl font-medium text-center mt-3">{user.email}</h3>

                    <button onClick={handleLogOut} className="btn bg-rose-500 hover:bg-rose-600 px-12 py-1 rounded-md text-white ">Log Out <IoLogOutOutline  className='text-xl'/> </button> 
                </ul>
                </div> 
                :
                <Link to="/login">
                    <button className="btn bg-pink-600 text-lg ms-2 hover:bg-rose-600 rounded-md text-white">Login</button>
                </Link>
              }

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
