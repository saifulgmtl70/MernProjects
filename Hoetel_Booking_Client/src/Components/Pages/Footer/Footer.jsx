import { RiHotelBedLine } from "react-icons/ri";
import { FaFacebookF, FaLinkedinIn , FaPinterestP  } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";

import { Link } from "react-router-dom";

const Footer = () => {
    return (
     

        <footer >
            <section className="px-12 py-20 bg-[#252525]">
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-14'>
                    <div>
                        <Link
                        to="/" className="logo">
                            <h2 className="flex items-center gap-2  mb-10 font-extrabold text-gray-200">  <RiHotelBedLine className="text-5xl font-extrabold" /> <p className="text-3xl"> LuxBeach Hotel </p> </h2>
                        </Link>
                        <p className="text-gray-300 text-lg mb-10">Lorem ipsum dolor sit amet, consecte adip sicing elit, sed do eiusmod ipsum dolor.</p>

                        <div className="join w-full mb-4">
                            <input className="input w-11/12 h-16 rounded-none text-2xl" placeholder="Email"/>
                            <button className="bg-[#C19B76] hover:bg-[#A18365] w-3/12 text-lg text-[#fff] h-16 rounded-none">Sign In</button>
                        </div>

                        <div className="flex items-center gap-7 mt-10 text-2xl text-gray-300">
                            <FaFacebookF  />
                            <RiTwitterXLine  />
                            <FaLinkedinIn  />
                            <FaPinterestP />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl text-gray-200 mb-5 ">Usefull Links</h2>
                        <hr className="w-32 mb-12" />

                        <ul className="flex flex-col gap-8 text-gray-400">
                            <li><a href="">About Us</a></li>
                            <li><a href="">Work Here</a></li>
                            <li><a href="">Team</a></li>
                            <li><a href="">Happenings</a></li>
                        </ul>
                    </div>



                    <div>
                        <h2 className="text-2xl text-gray-200 mb-5 ">Contact Us</h2>
                        <hr className="w-32 mb-12" />

                        <ul className="flex flex-col gap-8 flex-wrap text-gray-400">
                            <li className="flex items-center gap-3"> <FaPhone /> <a href=""> (0123) 456 789</a></li>
                            
                            <li className="flex items-center gap-3"> <MdEmail /> <a href=""> azadcoxgmtl@gmail.com </a></li>
                            
                            <li className="flex items-center gap-3"> <MdLocationPin /> <a href="">  A26BT5 Building, SilverC Street, New York. </a></li>
                            
                            
                        </ul>
                    </div>


                    <div>
                        <h2 className="text-xl text-gray-200 mb-5 ">OUR WORLDWIDE OFFICE</h2>
                        <hr className="w-32 mb-12" />

                        <img src="https://i.ibb.co/fvSp76m/wold.png" alt="" />
                        
                    </div>
                    
                    
                    
                </div>
            </section>

            <section className="px-12 py-16 bg-[#191919]">
                <h2 className="text-2xl text-center text-[#92775C]">Sailing | Hotel Room Booking WordPress Theme . © Powered by ThimPress.</h2>
            </section>

        </footer>

        


  

        
    );
};

export default Footer;