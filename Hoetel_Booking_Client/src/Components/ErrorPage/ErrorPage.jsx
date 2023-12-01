import { Link } from "react-router-dom";


const ErrorPage = () => {

    

    return (
 

            <div className="grid h-screen px-4 py-8 bg-white place-content-center">
                <div className="text-center py-12">
                    
                    <img src="https://i.ibb.co/Hrrb5ym/1-z-E2qn-VTJehut7-B8-P2a-Mn3-A.gif" className="w-11/12  mx-auto" />

                    <h1
                    className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                    >
                    OOOPS!!! Sorry. Nothing found
                    </h1>

                    <p className=" text-gray-500">We can not find that page.</p>
                    <Link to="/">
                    <button className="mx-auto mb-12 mt-3 text-white rounded-md bg-rose-500 px-12 py-3">Back to Home</button>
                    </Link>
                    
                </div>
            </div>
    );
};

export default ErrorPage;