import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderSection = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://y-plum-nine.vercel.app/admin/advertisements');
      console.log('Fetched advertisements:', response.data);
      setAdvertisements(response.data.filter(ad => ad.in_slide));
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        advertisements.length > 1 ? (
          <Slider {...settings}>
            {advertisements.map((ad) => (
              <div key={ad._id} className="carousel-item rounded-xl p-2">
                <img src={ad.image} alt={ad.mediName} className="object-cover w-full h-[40rem] rounded-xl" />
                <div className="carousel-caption">
                  
                 
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          advertisements.map((ad) => (
            <div key={ad._id} className="relative carousel-item rounded-xl p-2">
              <img src={ad.image} alt={ad.mediName} className="object-cover w-full h-[40rem] rounded-xl" />
              <div className="carousel-caption absolute p-4 text-center glass rounded-r-xl text-white shadow-md font-semibold border-2   ">
                
              
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default SliderSection;
