import { CiUser } from "react-icons/ci";
import { BiChild } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Room = ({ room }) => {

    // Destructure the room object
    // eslint-disable-next-line react/prop-types
    const {_id,  room_img, name, types:{twnin, dbl, singl, delx, faml}, capacity: { adults, children }, price_per_night } = room;

    return (
        <article className="overflow-hidden border rounded-sm shadow transition hover:shadow-lg">
            <div className=" hover:relative overflow-hidden duration-1000 ">
                <img alt="Room" src={room_img} className="h-full overflow-hidden lg:h-[240px]  hover:scale-105 duration-1000 ease-in-out  w-full object-cover" />
                <div className=" absolute w-full h-auto flex items-center justify-center  opacity-50 top-0 left-0">
                    {/* <TiArrowMaximise className="my-48 lg:my-28 text-[#222] text-3xl font-bold" /> */}
                </div>
            </div>

            <div className="bg-white space-y-3 p-4 sm:p-6">
                <a href="#">
                    <h3 className="mt-0.5 text-[18px] text-gray-900 hover:text-[#78D0C5] duration-500 ease-in-out">{name}</h3>
                </a>

                <div className="flex items-center text-start justify-between text-gray-500 font-medium border-b pb-3 justify-start">
                    <div className="flex items-center gap-3">
                        <p> {faml} </p>
                        <p> {twnin} </p>
                        <p> {dbl} </p>
                        <p> {singl} </p>
                        <p> {delx} </p>
                    </div>

                    <Link to={`/seerooom/${_id}`} className="text-rose-500 text-[20px] font-bold"> <FaArrowRightLong /> </Link>
                </div>

                <div className="flex items-center justify-between text-[16px] text-gray-500">
                    <p className="flex items-center"> <CiUser /> <span>{adults} Adults</span> </p>
                    <p className="flex items-center"> <BiChild /> <span>{children} Childrens </span></p>
                    <p> <span className="text-[#000] font-bold">${price_per_night}</span>/per night</p>
                </div>

                
            </div>
        </article>
    );
};

export default Room;
