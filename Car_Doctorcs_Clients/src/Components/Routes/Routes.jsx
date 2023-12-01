import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import CheckOut from "../Pages/CheckOut/CheckOut";
import SeeOrders from "../Pages/SeeOrders/SeeOrders";

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
            path:'/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <SignUp></SignUp>
        },
        
        {
          path: '/checkout/:id',
          element: <PrivateRoutes> <CheckOut></CheckOut> </PrivateRoutes>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
          path: '/orders',
          element: <PrivateRoutes> <SeeOrders></SeeOrders> </PrivateRoutes>
        }
      ]
    },
  ]);

export default router