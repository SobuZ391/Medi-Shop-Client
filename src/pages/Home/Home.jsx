import React from 'react';

import Category from '../../Category/Category';
import DiscountProducts from '../../DiscountPage/DiscountProducts';
import SliderSection from '../../Components/Home/SliderSection';
import FAQ from '../../Components/Home/ExtraSection/FAQ';
import Team from '../../Components/Home/ExtraSection/Team';
import { Helmet } from 'react-helmet-async';



const Home = () => {
    return (
        <div>
         <Helmet>
        <title>Medi-Shop | Home</title>
       
      </Helmet>
       <SliderSection></SliderSection>
           <Category/>
           <DiscountProducts/>
           <FAQ></FAQ>
           <Team></Team>
        </div>
    );
};

export default Home;