import { CiUser } from "react-icons/ci";
import { BiChild } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const OurRoom = ({ourRoom}) => {

    // eslint-disable-next-line no-unused-vars
    const {_id,  room_img, name, types:{twnin, dbl, singl, delx, faml}, capacity: { adults, children }, price_per_night } = ourRoom;


    return (
       
        <Link href="#" className="block shadow-lg border border-gray-300 bg-base-100">
            <img alt="Home" src={room_img} className="h-56 w-full hover:overflow-hidden hover:scale-95 duration-1000 ease-in-out  object-cover"/>

            <div className="mt-2 px-3 space-y-4">
                <div className="my-3">
                    <h2 className="text-[18px] text-[#122033] hover:text-[#91D9D0] duration-500"> {name} </h2>
                </div>

                <div className="pb-4 border-b flex items-center text-start justify-between text-[15px] text-gray-500">
                <div className="flex items-center gap-3">
                        <p> {faml} </p>
                        <p> {twnin} </p>
                        <p> {dbl} </p>
                        <p> {singl} </p>
                        <p> {delx} </p>
                    </div>

                    <Link to={`/seerooom/${_id}`} className="text-rose-500 text-[20px] font-bold"> <FaArrowRightLong /> </Link>
                </div>

                <div className="pb-4 border-b flex items-center justify-between text-start  gap-2 text-[15px] text-gray-500">
                    <h3 className="flex items-center"> <CiUser></CiUser> {adults} Adults </h3>
                    <h3 className="flex items-center"> <BiChild></BiChild> {children} Children </h3>
                    <h3> <span className="font-bold text-[#000]">${price_per_night}</span>/night </h3>
                </div>
            </div>
        </Link>

    );
};

export default OurRoom;