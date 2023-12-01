import { Link } from 'react-router-dom';
import './Contact.css'

import { CiLocationOn } from "react-icons/ci";
import { IoMdTimer } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";

const Contact = () => {
    return (
        <main>

            <section className="px-12 py-10 bg-contact">
                <h3 className="text-center mt-12 text-white text-[25px] z-50">
                    <Link to="/" className="text-rose-500 font-bold">
                        Home
                    </Link>
                    / Contact
                </h3>
            </section>


 
            <section className="bg-base-100 px-12 py-12">
                <div>
                    <h2 className='text-[30px] text-[#000] font-bold mb-8'>Contact Us</h2>
                    <h4 className='text-[20px] text-[#000] font-bold mb-3'>Get in Touch</h4>
                    <p className='text-gray-500'>We are also active in social media. You can find uson below adresses.</p>
                </div>

                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 space-y-5 lg:py-12">
                            
                            <p className="max-w-xl bg-[#FAFAFA] gap-4 px-4 py-7 mb-4 rounded-sm text-lg flex items-center"> <CiLocationOn className='text-3xl text-[#91D9D0]' /> <span>Eidghaon, CoxsBazar Bangladesh</span> </p>

                            <p className="max-w-xl  p-4 rounded-sm gap-4 text-lg flex items-center"> <IoMdTimer  className='text-3xl text-[#91D9D0]' /> <span> Opening Hour 8:00 AM - 10:00 PM </span> </p>

                            <p className="max-w-xl bg-[#FAFAFA] gap-4 px-4 py-7  rounded-sm text-lg flex items-center"> <SlCalender  className='text-3xl text-[#91D9D0]' /> <span>  Monday - Sunday </span> </p>

                            <p className="max-w-xl gap-2 p-4 rounded-sm text-lg flex items-center"> <FiPhoneCall  className='text-3xl text-[#91D9D0]' /> <span>  Call: 01794 340 979 </span> </p>

                            <p className="max-w-xl bg-[#FAFAFA] gap-4 px-4 py-7  rounded-sm text-lg flex items-center"> <CiMail  className='text-3xl text-[#91D9D0]' /> <span>  Email: info@thimpress.com </span> </p>

                            
                        </div>

                        <div className="rounded-sm bg-white p-8 shadow-sm border lg:col-span-3 lg:p-12">
                            <form action="" className="space-y-4">
                                

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="sr-only" htmlFor="email">Full Name:</label>
                                        <input className="w-full rounded-sm border-gray-200 p-3 text-sm" placeholder="Full Name " type="text" id="email"/>
                                    </div>

                                    <div>
                                        <label className="sr-only" htmlFor="phone">Email</label>
                                        <input className="w-full rounded-sm border-gray-200 p-3 text-sm" placeholder="Email Address" type="email" id="phone"/>
                                    </div>
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="name">Subject</label>
                                    <input className="w-full rounded-sm border-gray-200 p-3 text-sm" placeholder="Subject" type="text" id="name" />
                                </div>

                            

                                <div>
                                    <label className="sr-only" htmlFor="message">Message</label>

                                    <textarea className="w-full rounded-sm border-gray-200 p-3 text-sm" placeholder="Message" rows="8" id="message"
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <button type="submit" className="inline-block w-full rounded-sm bg-[#5AB9C1] px-10 py-5 text-white font-medium text-white sm:w-auto" >
                                    Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            
        </main>
    );
};

export default Contact;