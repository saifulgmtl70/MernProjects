import { Link, useLoaderData } from "react-router-dom";
import './Blogs.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaRegCalendarCheck } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import {  useEffect, useState } from "react";


const SeeBlog = () => {
    const blogs = useLoaderData();
    console.log(blogs);
    const roomId = blogs._id;
    const [commentText, setCommentText] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [comment, setComment] = useState([]);


    const handlePostingComment = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/blogs/${roomId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({commentText, name, email }),
            });

            if (response.ok) {
                // Review submitted successfully, update the UI or take necessary action
                // Fetch updated reviews or update the local state with the new review
                toast('Review submitted successfully');
                // Fetch updated reviews again to reflect changes
                const updatedReviewsResponse = await fetch(`/blogs/${roomId}/comment`);
                const updatedReviewData = await updatedReviewsResponse.json();
                setComment(updatedReviewData);
            } 
            else {
                // Handle error cases where the review submission failed
                toast('Failed to post comment');
            }
        } 

        catch (error) {
            // toast('Error posting comment:', error);
            console.log(error);
        }
    };


    useEffect(() => {
        const fetchReviewsForRoom = async () => {
        try {
            const response = await fetch(`https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/blogs/${roomId}/comment`);
            const reviewData = await response.json();
            setComment(reviewData);
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
            <section className="px-12 py-10 bg-blogs">
                <h3 className="text-center mt-12 text-white text-[25px] z-50">
                    <Link to="/" className="text-rose-500 font-bold">
                        Home
                    </Link>
                    / <Link to="/blogs" className="text-rose-500 font-bold">Blogs</Link> / {blogs.title}
                </h3>
            </section>

            <section className="px-12 py-12">
                <h2 className="text-center text-4xl font-bold text-cyan-900 mb-14">Our Blogs</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="col-span-2">
                        <div  className=" hover:relative overflow-hidden duration-1000 mb-10">
                            <img alt="Office" src={blogs.image} className="h-auto  w-full overflow-hidden hover:scale-105 duration-1000 ease-in-out  w-full object-cover " />
                        </div>
                        <div className="flex items-center gap-4 text-white">
                            <button className="px-4  py-3 rounded-sm bg-[#78D0C5]"> {blogs.tags[0]} </button>
                            <button className="px-4  py-3 rounded-sm bg-[#78D0C5]"> {blogs.tags[1]} </button>
                            <button className="px-4  py-3 rounded-sm bg-[#78D0C5]"> {blogs.tags[2]} </button>
                        </div>

                        <div className="mb-5 mt-5">
                            <h2 className="text-[19px] text-cyan-950 font-bold"> {blogs.title} </h2>
                        </div>

                        <div className="flex items-center gap-10">
                            <p className="flex items-center gap-2"> <FaRegCalendarCheck /> {blogs.date} </p>
                            <p className="flex items-center gap-2"> <CiUser /> {blogs.author} </p>
                        </div>

                        <p className="text-gray-500 text-[17px] my-4 border-b-2 pb-12"> {blogs.content} </p>

                        <div className="border-b-2 pb-12 mb-12">
                            {comment.length > 0 ? (
                                comment.map((review, index) => (
                                    <div key={index} className="flex ms-0 lg:ms-10 gap-3 mb-7">
                                        <img src="https://i.ibb.co/yXhdswN/9a2c118417afedc43a7b15d000ff0861-s-70-d-mm-r-g.jpg" className=" rounded-full w-16 h-16" alt="" />
                                        <div>
                                            <h2 className="text-[19px] text-[#000] font-bold"> {review.name} </h2>
                                            <p className="text-[17px] text-[#666] mb-2 ">{review.commentText} </p>
                                        </div>
                                    </div>
                                ))
                                ) : (

                                <h2 className="text-[19px] text-[#000] font-bold">0 Comment</h2>
                            )}



                        </div>

                        <div className="pb-12 mb-12 w-full">
                            <h2 className="text-2xl font-medium text-[#000] mb-4"> Leave a reply </h2>
                            <p className="text-gray-500 mb-12">Your email address will not be published. Required fields are marked *</p>

                            <form onSubmit={handlePostingComment}>

                                <div className="mb-5">
                                    <p className="mb-2 text-gray-500">Comment</p>
                                    <textarea name="" value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full lg:w-8/12 h-48" style={{resize: 'none'}}></textarea>
                                </div>

                                <div className="mb-5">
                                    <p className="mb-2 text-gray-500">Name</p>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="" className=" w-full lg:w-8/12 px-4 py-4 border border-gray-400 focus:outline-none focus:border-gray-400 " />
                                </div>

                                <div className="mb-5">
                                    <p className="mb-2 text-gray-500">Email</p>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className=" w-full lg:w-8/12 px-4 py-4 border border-gray-400 focus:outline-none focus:border-gray-400 " />
                                </div>

                                <div className="mb-5">
                                    <button className="px-8 py-4 w-full lg:w-8/12 rounded-sm bg-[#78D0C5] text-white">Post Comment</button>
                                </div>

                            </form>
                        </div>

                    </div>

                    <div className="bg-base-100 h-auto lg:h-3/5 py-5 border">

                        <div className=" border-b px-5 pb-8 mb-5">
                            <label htmlFor="" className="text-[22px] font-bold text-[#000] block mb-2">Search</label>
                            <input type="search" placeholder="Search Blogs" className="w-full py-3 border border-gray-400 focus:border-none rounded-sm mb-5" />
                        </div>


                        <div className=" border-b px-5 pb-8 mb-5">
                            <h2 className="text-[21px] font-bold text-[#000] block mb-2">CATEGORIES</h2>
                            <ul className=" space-y-4">

                                <li className="text-gray-400 hover:text-gray-500 text-[17px] cursor-pointer">Hotel</li>

                                <li className="text-gray-400 hover:text-gray-500 text-[17px] cursor-pointer">Event</li>

                                <li className="text-gray-400 hover:text-gray-500 text-[17px] cursor-pointer">Design</li>

                                <li className="text-gray-400 hover:text-gray-500 text-[17px] cursor-pointer">Uncategorized</li>
                            </ul>

                        </div>

                        <div className=" px-5 pb-8 mb-5">
                            <h2 className="text-[21px] font-bold text-[#000] block mb-10">TAG CLOUDS</h2>
                            <div className="flex  items-center gap-10 flex-wrap">

                                <button className="px-8 py-3 rounded-sm bg-[#E5F0F0] hover:bg-[#78D0C5] duration-1000"> services </button>

                                <button className="px-8 py-3 rounded-sm bg-[#E5F0F0] hover:bg-[#78D0C5] duration-1000"> hotels </button>

                                <button className="px-8 py-3 rounded-sm bg-[#E5F0F0] hover:bg-[#78D0C5] duration-1000"> hotel booking </button>

                                <button className="px-8 py-3 rounded-sm bg-[#E5F0F0] hover:bg-[#78D0C5] duration-1000"> deals </button>

                                <button className="px-8 py-3 rounded-sm bg-[#E5F0F0] hover:bg-[#78D0C5] duration-1000"> opulence </button>

                                <button className="px-8 py-3 rounded-sm bg-[#E5F0F0] hover:bg-[#78D0C5] duration-1000"> affordable </button>

                            </div>
                            

                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    );
};

export default SeeBlog;