/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaRegCalendarCheck } from "react-icons/fa";
import { CiUser } from "react-icons/ci";


// eslint-disable-next-line react/prop-types
const Blog = ({ourBlog}) => {


    const {_id, title, author,  date, content, image } = ourBlog;

    return (
        

        <article className="overflow-hidden border rounded-md shadow-lg transition hover:shadow-xl">
            <div  className=" hover:relative overflow-hidden duration-1000 ">
                <img alt="Office" src={image} className="h-auto lg:h-[240px] w-full overflow-hidden hover:scale-105 duration-1000 ease-in-out  w-full object-cover " />
            </div>
            

            <div className="bg-white space-y-3 p-4 sm:p-6">
                <Link href="#">
                    <h3 className="mt-0.5 text-lg text-cyan-900 hover:text-[#5AB9C1] duration-700"> {title} </h3>
                </Link>
                <div className="flex items-center gap-10">
                    <p className="flex items-center gap-2"> <FaRegCalendarCheck /> {date} </p>
                    <p className="flex items-center gap-2"> <CiUser /> {author} </p>
                </div>
                <p className="mt-2 mb-4 line-clamp-3 text-sm/relaxed text-gray-500"> {content} </p>
                <p><Link to={`/seeblog/${_id}`} className="mt-2 font-bold border-b-[3px] border-gray-500 text-[18px] hover:text-[#5AB9C1] duration-700">Read More </Link> </p> 
            </div>

        </article>
        

        
    );
};

export default Blog;




