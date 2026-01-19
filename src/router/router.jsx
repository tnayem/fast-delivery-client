import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Login/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRout from "../routs/PrivateRout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/coverage',
          element:<Coverage></Coverage>
        },
        {
          path:'/sendParcel',
          element:<PrivateRout><SendParcel></SendParcel></PrivateRout>
        }
    ]
  },
  {
    path:'/',
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRout><DashBoardLayout></DashBoardLayout></PrivateRout>,
    children:[
      {
        path:'myParcels',
        element:<MyParcels></MyParcels>
      }
    ]
  }
]);