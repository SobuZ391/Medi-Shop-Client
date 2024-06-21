import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const DiscountProducts = () => {
  const [discountProducts, setDiscountProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products') // Adjust the path to your JSON file
      .then(res => res.json())
      .then(data => {
        // Combine all products from different categories into a single array
        const allProducts = Object.values(data).flat();
        setDiscountProducts(allProducts);
      })
      .catch(err => console.error('Failed to fetch discount products:', err));
  }, []);

  return (
    <div className='container mx-auto'>
      <h1 className='text-center text-3xl text-gray-600 font-bold border-y-2 w-72 mx-auto my-4 p-2'>Discount Products</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="mySwiper h-[30rem]"
      >
        {discountProducts.map(product => (
          <SwiperSlide className='border-2 rounded-xl ' key={product._id}>
            <img className='object-cover h-60 cursor-pointer rounded-t-xl' src={product.image} alt={product.name} />
            <h3 className='text-xl bg-gray-100 rounded-b-xl p-2 uppercase'>{product.name}</h3>
            <p className='text-lg p-2 font-semibold line-through'>Original Price: {product.price}</p>
            <p className='text-lg p-2 border font-bold text-red-500'>Discount Price: {product.discountPrice}</p>
            <p className='text-sm p-2'>{product.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountProducts;
