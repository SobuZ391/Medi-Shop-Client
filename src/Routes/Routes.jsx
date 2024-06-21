import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import CategoryDetails from './../Category/categoryDetails';
import Shop from "../ShopPages/Shop";
import Cart from "../CartPage/Cart";
import Invoice from "../ShopPages/CheckoutPages/Invoice";
import Checkout from "../ShopPages/CheckoutPages/Checkout";
import Login from "../Login & Register/Login";
import SignUp from "../Login & Register/Register";
import CheckoutPage from "../pages/Home/Payment";
import InvoicePage from "../pages/Home/InvoicePage";
import Error from "../Shared/Error";
import UpdateProfile from "../Login & Register/UpdateProfile";
import UserDashboard from "../Dashboard/UserDashboard/UserDashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ManageUsers from "../Layout/Dashboard/ManageUsers";
import ManageCategories from "../Layout/Dashboard/ManageCategories";
import PaymentManagement from "../Layout/Dashboard/PaymentManagement";
import SalesReport from "../Layout/Dashboard/SalesReport";
import BannerManagement from "../Layout/Dashboard/BannerManagement";
import CartPage from "../CartPage/Cart";
import AdminRoute from "./AdminRoute";
import SellerDashboard from "../Layout/Dashboard/SellerDashboard/SellerDashboard";
import AdminHome from "../Layout/Dashboard/AdminHome";
import UserHome from "../Layout/Dashboard/UserHome";
import PaymentHistory from "../Layout/Dashboard/SellerDashboard/PaymentHistory";
import ManageMedicines from "../Layout/Dashboard/SellerDashboard/ManageMedicines";
import AskForAdvertisement from "../Layout/Dashboard/SellerDashboard/AskForAdvertisement";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error/>,
      children:[
        {
            path:'/',
            element:<Home></Home>
            
        },
        {
        path:"/category/:categoryName",
        element:<CategoryDetails />
        },
        {
          path:"/shop" ,
          element:<Shop/>
        },
        {
          path:'cart',
          element:<PrivateRoute><CartPage></CartPage></PrivateRoute>
        },
       
       
        {
          path:"/checkout" ,
          element:<CheckoutPage/>
        },
       
        {
          path:"/invoice" ,
          element:<InvoicePage/>
        },
       
        {
          path:"/login" ,
          element:<Login/>
        },
       
        {
          path:"/signup" ,
          element:<SignUp/>
        },
       {
        path:"/update-profile",
        element:<UpdateProfile/>
       },
       
      
       
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      
      children:[
     
        {
          path:'adminHome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path:'userHome',
          element:<UserHome></UserHome>
        },
        {
          path:'manage-users',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'manage-categories',
          element:<AdminRoute><ManageCategories></ManageCategories></AdminRoute>
        },
        {
          path:'payment-management',
          element:<PaymentManagement></PaymentManagement>
        },
        {
          path:'sales-report',
          element:<SalesReport></SalesReport>
        },
        {
          path:'banner-management',
          element:<BannerManagement></BannerManagement>
        },
        {
          path:'seller-dashboard',
          element:<SellerDashboard/>
        },
        {
          path:"user-dashboard",
          element:<UserDashboard/>
         },
         
        {
          path:"payment-history",
          element:<PaymentHistory></PaymentHistory>
         },
         {
          path:'manage-medicines',
          element:<ManageMedicines></ManageMedicines>
         }
         ,
         {
          path:'advertisement',
          element:<AskForAdvertisement></AskForAdvertisement>
         }

         
      ]
    }
    
  ]);
  export  default router