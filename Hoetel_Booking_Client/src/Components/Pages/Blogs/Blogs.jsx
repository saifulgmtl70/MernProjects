import { Link } from "react-router-dom";
import './Blogs.css'
import { useEffect, useState } from "react";
import Blog  from "./Blog";



const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const blogsPerPage = 5;

    // Simulating fetching rooms data
    useEffect(() => {
        // Here, you can make an API call to fetch room data
        // Replace this logic with actual API call
        const fetchRooms = async () => {
            // Simulating fetching data from an API
            const response = await fetch('https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/blogs');
            const data = await response.json();
            setBlogs(data);
        };

        fetchRooms();
    }, []);


    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Logic to get rooms for the current page
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlog = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    


    return (
        <main>
            <section className="px-12 py-10 bg-blogs">
                <h3 className="text-center mt-12 text-white text-[25px] z-50">
                    <Link to="/" className="text-rose-500 font-bold">
                        Home
                    </Link>
                    / Blogs
                </h3>
            </section>

            <section className="px-12 py-12">
                <h2 className="text-center text-4xl font-bold text-cyan-900 mb-14">Our Blogs</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 col-span-2 gap-5">
                       
                       {
                         currentBlog.map(ourBlog => <Blog key={ourBlog._id} ourBlog={ourBlog}></Blog>)
                       }
                       
                    </div>

                    <div className="bg-base-100 w-full px-7 lpy-5  border-nonelg:border">

                        <div className=" border-b px-5 pb-8 mb-5">
                            <label htmlFor="" className="text-[22px] font-bold text-[#000] block mb-2">Search</label>
                            <input type="search" placeholder="Search Blogs" className="w-full py-3 border border-gray-400 focus:border-none rounded-sm mb-5" value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}  />
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

            {/* Pagination */}
            <ul className="flex justify-center py-3 pb-12 space-x-2 mt-4">
                {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }).map((_, index) => (
                    <li key={index}>
                        <button className="bg-rose-500 px-5 py-2 rounded hover:bg-rose-600 text-white focus:outline-none text-[20px]" onClick={() => paginate(index + 1)}>{index + 1}</button>
                    </li>
                ))}
            </ul>

        </main>
    );
};

export default Blogs;