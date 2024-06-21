import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './../Shared/Navbar';
import Footer from './../Shared/Footer';


const Main = () => {
    const location =useLocation();
    const noHeaderFooter = location.pathname.includes('login')
    return (
        <div  >
          {noHeaderFooter ||   <Navbar></Navbar>}
            <Outlet/>
           {noHeaderFooter ||  <Footer/>}
        </div>
    );
};

export default Main;