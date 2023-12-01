import { Link, useLocation, useNavigate } from "react-router-dom";
import {  AiOutlineEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { useContext, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Provider/AuthProvider";

const SignUp = () => {

    const [showPass, setShowPass] = useState(null);

    const { createUser  } = useContext(AuthContext);

    const location = useLocation();
    const naviGate = useNavigate();


    const handleSignUp = (e) =>{
        e.preventDefault();
        const form = e.target;

        const username = form.username.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const user = { username, photo, email, password };
        console.log(user);


        if(password.length < 6){
            toast("Password Should be at least 6 character or more logner than that");
            return;
        }

        else if( password === '' || email === ''){
            toast("Please fill out the password or email first");
            return;
        }

        else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
            toast("Your password should contain with uppercae,lowercase,num and speical character.")
            return;
        }
        


        createUser(email, password, email, photo)
        .then((result) =>{
            console.log(result.user);
            toast("Account Created Successfully");
            naviGate(location?.state ? location.state : '/login');



            
            const createdAt = result.user?.metadata?.creationTime;
            const user  = {  email, createdAt: createdAt}

            fetch('https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/users',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                
            })


        })
        .catch(error =>{
            console.log(error);
            toast("Something went wrong");
        })





        form.reset();
    }

    return (
        <main>
            <section className="px-12 py-14">
                <ToastContainer />

                {/* <div className="w-full lg:w-7/12 mx-auto bg-base-100 px-12 py-20 shadow-2xl">
                    <img src="https://i.ibb.co/Vt9Fdqv/6478-200.png" className="w-44 mb-4 mx-auto" alt="" />
                    <h2 className="text-center text-2xl font-bold mb-10">Please Sign Up Here</h2>
                    <form onSubmit={handleSignUp} action="" className="px-10 py-20 space-y-10">

                        <div className="mx-auto w-full lg:w-10/12 mb-10" >
                            <span
                             className="text-[20px] text-cyan-900 font-bold mb-4">Username:</span>
                            <input type="text" name="username" className=" w-full text-[18px] px-8 py-5 bg-blue-100 rounded-md border" placeholder="Enter your username here" />
                        </div>

                        <div className="mx-auto w-full lg:w-10/12 mb-10" >
                            <span
                             className="text-[20px] text-cyan-900 font-bold mb-4">Photo Url:</span>
                            <input type="text" name="photo" className=" w-full text-[18px] px-8 py-5 bg-blue-100 rounded-md border" placeholder="Enter your photo url here" />
                        </div>

                        <div className="mx-auto w-full lg:w-10/12 mb-10" >
                            <span
                             className="text-[20px] text-cyan-900 font-bold mb-4">Email:</span>
                            <input type="email" name="email" className=" w-full text-[18px] px-8 py-5 bg-blue-100 rounded-md border" placeholder="Enter your email here" />
                        </div>

                        <div className="mx-auto w-full lg:w-10/12 mb-10 relative" >
                            <span
                             className="text-[20px] text-cyan-900 font-bold mb-4">Password:</span>
                            <input type={showPass ? "text" : "password"} name="password" className=" w-full text-[18px] px-8 py-5 bg-blue-100 rounded-md border" placeholder="Enter your password here" />

                            <span onClick={() => setShowPass(!showPass)} className="absolute cursor-pointer inset-y-0 mt-8 end-0 grid place-content-center px-4">
                            
                            {
                                showPass ? <AiTwotoneEyeInvisible></AiTwotoneEyeInvisible> : <AiOutlineEye></AiOutlineEye>
                            }

                            </span>

                        </div>

                        

                        <div className="mx-auto w-full lg:w-10/12 mt-5 mb-10" >
                            <input type="submit" value="Sign Up" className=" cursor-pointer w-full text-[18px] text-white px-8 py-4 rounded-md border bg-rose-500" />
                        </div>

                        <div className="mx-auto w-full lg:w-10/12 mb-10" >
                            <h1 className="flex">Already have accoun? <Link to="/login" className="text-rose-500 mx-2"> Login</Link> here. </h1>
                        </div>

                     


                    </form>
                </div>
                 */}



                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full ">


                        <form onSubmit={handleSignUp}  action="" className="mb-0 mt-6 space-y-8 bg-slate-50 rounded-lg p-4 shadow-2xl px-10 py-14">
                            <p className="text-center text-2xl mb-12  font-medium">Sign in to your account</p>

                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>

                                <div className="relative">
                                    <input type="text" name="username" className="w-full text-lg rounded-lg border-gray-200 p-4 pe-12  shadow-sm" placeholder="Enter your username here" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="photo" className="sr-only">Photo</label>

                                <div className="relative">
                                    <input type="text" name="photo" className="w-full text-lg rounded-lg border-gray-200 p-4 pe-12  shadow-sm" placeholder="Enter your photo url here" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>

                                <div className="relative">
                                    <input type="email" name="email" className="w-full text-lg rounded-lg border-gray-200 p-4 pe-12  shadow-sm" placeholder="Enter your email here" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>

                                <div className="relative">
                                    <input type={showPass ? "text" : "password"} name="password" className="w-full mb-5 rounded-lg border-gray-200 p-4 pe-12 text-lg shadow-sm" placeholder="Enter your password here"/>

                                    <span onClick={() => setShowPass(!showPass)} className="absolute cursor-pointer inset-y-0 -mt-3 end-0 grid place-content-center px-4">
                                    
                                    {
                                        showPass ? <AiTwotoneEyeInvisible></AiTwotoneEyeInvisible> : <AiOutlineEye></AiOutlineEye>
                                    }

                                    </span>

                                </div>
                            </div>

                            <div className="col-span-6">
                            <label className="flex gap-4">
                                <input type="checkbox" id="MarketingAccept" name="terms" className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm" defaultChecked={true} />

                                <span className="text-sm text-gray-700">
                                I accept your tearms & conditions
                                </span>
                            </label>

                        </div>

                            <button type="submit" className="block w-full mt-12 rounded-lg bg-rose-600 px-5 py-3 text-lg font-medium text-white">Sign Up </button>

                            <p className="text-center text-sm text-gray-500">
                                Already have an account?
                                <Link to="/login" className="text-rose-600 text-medium" href=""> Login</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </section>
        </main>
    );
};

export default SignUp;