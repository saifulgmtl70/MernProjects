import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import RoomsPage from "../Pages/RoomsPage/RoomsPage";
import Contact from "../Pages/Contact/Contact";
import SeeRooms from "../Pages/SeeRooms/SeeRooms";
import Bookings from "../Pages/Bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";
import Blogs from "../Pages/Blogs/Blogs";
import SeeBlog from "../Pages/Blogs/SeeBlog";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        {
          path: '/rooms',
          element: <RoomsPage></RoomsPage>,
          loader: () => fetch('https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/rooms')
        },
        {
          path: '/contact',
          element: <Contact></Contact>
        },
        {
          path: '/seerooom/:id',
          element: <PrivateRoutes> <SeeRooms></SeeRooms> </PrivateRoutes>,
          loader: ({params}) => fetch(`https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/rooms/${params.id}`)
        },
        {
          path: '/bookings',
          element: <Bookings></Bookings>
        },
        {
          path: '/blogs',
          element: <Blogs></Blogs>
        },

        {
          path:'/seeblog/:id',
          element: <SeeBlog></SeeBlog>,
          loader: ({params}) => fetch(`https://luxbeachresort-cb8jt2do9-azadgmtls-projects.vercel.app/blogs/${params.id}`)
        }

        
        
      ]
    },
  ]);

export default router