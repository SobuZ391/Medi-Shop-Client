import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Category = () => {
  const navigate = useNavigate();
  const [medicineCategories, setMedicineCategories] = useState([]);

  useEffect(() => {
    fetch('https://y-plum-nine.vercel.app/categories')
      .then(res => res.json())
      .then(data => {
        const uniqueCategories = Array.from(new Set(data.map(item => item.categoryName)))
          .map(categoryName => data.find(item => item.categoryName === categoryName));
        setMedicineCategories(uniqueCategories);
      }) 
      .catch(error => console.error('Error fetching medicine categories:', error));
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className='container mx-auto'>
    
      <h1 className='text-center text-3xl text-gray-600 font-bold border-y-2 w-72 mx-auto my-4 p-2'>Medicine Category</h1>
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
        className="mySwiper"
      >
        {medicineCategories.map((category, index) => (
          <SwiperSlide className='border-2 rounded-xl' key={index} onClick={() => handleCategoryClick(category.categoryName)}>
            <img className='object-cover h-60 cursor-pointer rounded-t-xl' src={category.categoryImage} alt={category.name} />
            <h3 className='text-xl bg-gray-100 rounded-b-xl p-2 uppercase'>{category.categoryName}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
