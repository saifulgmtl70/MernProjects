import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

import {  AiOutlineEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Login = () => {

    const [showPass, setShowPass] = useState(null);
    const { signIn, signInWithGoogle } = useContext(AuthContext);

    const location = useLocation();
    const naviGate = useNavigate();
 

    const handleLogin = (e) =>{
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        const user = {  email, password };
        console.log(user);

        signIn(email, password)
        .then(result =>{
            

            const loggedInUser = result.user;
            console.log(loggedInUser);
            const user = { email };
            
            axios.post('https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/jwt', user, { withCredentials: true })

            .then(res =>{
                toast("Logged in successfully")
                console.log(res.data);
                if (res.data.success) {
                    naviGate(location?.state ? location?.state : '/')
                }
            })
        })

        .catch(error =>{
            console.log(error);
            toast('Something Went Wrong')
        })
    }

    const handleGoogleLogin = async() =>{
        try{
            await signInWithGoogle();
            toast("Account Created Successfully");
            naviGate(location?.state ? location.state : '/');

        }
        catch (error){
            toast("Something Went wrong");
        }
    }


    return (
       

        <main>
            <section className="py-12">
                <ToastContainer></ToastContainer>


                {/* <div className=" w-full lg:w-7/12 mx-auto bg-base-100 px-12 py-10 shadow-2xl">
                    <img src="https://i.ibb.co/rZC9Rkx/295128.png" className=" w-36 mb-4 mx-auto" alt="" />
                    <h2 className="text-center text-3xl font-bold mb-10">Please Login Here</h2>
                    <form onSubmit={handleLogin} action="" className="px-10 py-20 space-y-10">
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

                        <div className="mx-auto w-full lg:w-10/12 mb-10" >
                            <p className=" text-cyan-600 font-bold cursor-pointer">Forgot Password?</p>
                        </div>

                        <div className="mx-auto w-full lg:w-10/12 mt-5 mb-10" >
                            <input type="submit" value="Login" className="cursor-pointer w-full text-[18px] text-white px-8 py-4 rounded-md border bg-rose-500"  />
                        </div>

                        <div className="mx-auto w-full lg:w-10/12 " >
                            <h1 className="flex">Not have accoun? <Link to="/signup" className="text-rose-500 mx-2"> Sign Up</Link> here. </h1>
                        </div>

                     
                        <div className="flex flex-col w-full border-opacity-50">

                            <div className="divider">OR</div>
                            <h3 className="text-2xl text-center mt-3 mb-7">Conitnue With</h3>
                            <div className="flex justify-center items-center gap-10">
                                <div onClick={handleGoogleLogin} className="bg-gray-100 p-4 rounded-full cursor-pointer">
                                    <FcGoogle />
                                </div>

                                <div className="bg-gray-100 text-sky-600 p-4 rounded-full cursor-pointer">
                                    <FaFacebookF />
                                </div>

                                <div className="bg-gray-100 p-4 rounded-full cursor-pointer">
                                    <FaGithub />
                                </div>
                            </div>
                        </div>


                    </form>
                </div> */}

                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">


                        <form onSubmit={handleLogin}  action="" className="mb-0 mt-6 space-y-8 bg-slate-50 rounded-lg p-4 shadow-2xl px-10 py-14">
                            <p className="text-center text-2xl mb-12  font-medium">Sign in to your account</p>
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

                                    <span onClick={() => setShowPass(!showPass)} className="absolute cursor-pointer inset-y-0 -mt-10 end-0 grid place-content-center px-4">
                                    
                                    {
                                        showPass ? <AiTwotoneEyeInvisible></AiTwotoneEyeInvisible> : <AiOutlineEye></AiOutlineEye>
                                    }

                                    </span>
                                    <button  href="" className='justify-start text-left'>Forgot Password?</button>

                                </div>
                            </div>

                            <button type="submit" className="block w-full mt-12 rounded-lg bg-rose-600 px-5 py-3 text-lg font-medium text-white">Login </button>

                            <div className="flex flex-col w-full border-opacity-50">

                                <div className="divider">OR</div>

                            </div>

                            <div className="flex justify-center items-center gap-10">
                                <div onClick={handleGoogleLogin} className="bg-gray-100 p-4 rounded-full cursor-pointer">
                                    <FcGoogle />
                                </div>

                                <div className="bg-gray-100 text-sky-600 p-4 rounded-full cursor-pointer">
                                    <FaFacebookF />
                                </div>

                                <div className="bg-gray-100 p-4 rounded-full cursor-pointer">
                                    <FaGithub />
                                </div>
                            </div>

                            <p className="text-center text-sm text-gray-500">
                                Do not have any account?
                                <Link to="/signup" className="text-rose-600 text-medium" > Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </section>
        </main>
    );
};

export default Login;