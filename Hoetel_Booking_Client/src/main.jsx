import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import './fonts.css';



import {

  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Components/Provider/AuthProvider';
import router from './Components/Routes/Routes';






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     
     

     <AuthProvider>
         <RouterProvider router={router}></RouterProvider>
     </AuthProvider>

  </React.StrictMode>,
)
