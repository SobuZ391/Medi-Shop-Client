import React from 'react';

import Category from '../../Category/Category';
import DiscountProducts from '../../DiscountPage/DiscountProducts';
import SliderSection from '../../Components/Home/SliderSection';
import FAQ from '../../Components/Home/ExtraSection/FAQ';
import Team from '../../Components/Home/ExtraSection/Team';



const Home = () => {
    return (
        <div>
       <SliderSection></SliderSection>
           <Category/>
           <DiscountProducts/>
           <FAQ></FAQ>
           <Team></Team>
        </div>
    );
};

export default Home;