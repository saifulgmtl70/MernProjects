

const HomeAbout = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="bg-cover p-10 bg-center h-screen flex gap-3" style={{ backgroundImage: 'url("https://i.ibb.co/DQG1BLS/background-2.png")' }}>
                <img src="https://i.ibb.co/j39NLZf/image-box-1.jpg" className="w-6/12 h-4/5  " alt="" />
                <img src="https://i.ibb.co/TgNCZWZ/image-box-2.jpg" className="w-6/12 h-4/5  my-auto"  alt="" />
            </div>

            <div className="text-center space-y-10 my-20">
                <p className="text-[20px]">SERVICES SINCE 1984</p>
                <h2 className="text-[44px]">Redefines the luxury hospitality experience.</h2>
                <p className="w-11/12 text-gray-500 ">Sitting on the high cliffs of the Amalfi Coast, Casa Angelina offers a sublime slice of modern minimalism on the Mediterranean, with an emphasis on elegant simplicity and first-rate food, An airy refuge, our boutique 39-room hotel.</p>

                <button className="px-4 mx-auto w-6/12 py-6 rounded-md bg-[#a3896f] text-[#fff]">About Us</button>
            </div>
        </div>
    );
};

export default HomeAbout;