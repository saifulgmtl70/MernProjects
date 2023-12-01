import axios from "axios";
import { useEffect, useState } from "react";
import Room from "./Room";
import { Link } from "react-router-dom";



const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    

    useEffect(() => {
        axios.get("https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/rooms")
            .then(res => {
                setRooms(res.data);
                const showReooms = res.data.slice(0, 6);
                setRooms(showReooms)
                // console.log(res.data);
            })
            .catch(error => {
                console.error("Error fetching rooms:", error);
            });
    }, []); // Empty dependency array to fetch data only once on component mount

    return (
        <div>
            <h2 className="text-[44px] text-center mb-14 text-[#000000] font-bold">Our Rooms</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {rooms.map(room => <Room key={room._id} room={room}></Room>)}
            </div>

            <div className="text-center mt-14">
                <Link to="/rooms">
                    <button className="px-16 py-4 rounded-sm bg-[#fff] border-2 border-[#78D0C5] hover:bg-[#78D0C5] text-[20px] hover:text-white hover:shadow-2xl hover:-translate-y-3 duration-500">View All Rooms</button>
                </Link>
            </div>
              
        </div>
    );
};

export default Rooms;
