


// import { FaBeer } from 'react-icons/fa';

import AvailabilityForm from "./AvailabilityForm ";
import HomeAbout from "./HomeAbout";
import HomeSlider from "./HomeSlider";
// import MapContainer from "./MapContainer";
import SimpleMap from "./MapGoogle";
import OurFacilites from "./OurFacilites";
import Rooms from "./ShowRooms/Rooms";



const Home = () => {
    return (
        <main>
           
            <section className="">
                <HomeSlider></HomeSlider>
            </section>

            <section className="py-14">
                <AvailabilityForm></AvailabilityForm>
            </section>

            <section className="px-12 py-14">
                <HomeAbout></HomeAbout>
            </section>

            <section className="px-12 py-14 bg-[#FFF4EC]">
                <OurFacilites></OurFacilites>
            </section>

            <section className="px-12 py-14 bg-[#fafafa]">
                <Rooms></Rooms>
            </section>

            <section>
                <SimpleMap></SimpleMap>
            </section>

           

        </main>
    );
};

export default Home;