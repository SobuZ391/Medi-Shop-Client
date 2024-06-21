import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SubcategoryArtCraft = () => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://art-craft-store-server-lyart.vercel.app/craftSubcategories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubcategories(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors if needed, like setting an error state
      }
    };

    fetchData(); // Call the function to fetch data when component mounts
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl lg:text-2xl font-bold text-primary btn border-y-2 rounded-lg text-center  flex mb-4">
        Art & Craft Subcategories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subcategories.map((subcategory, index) => (
          <Link key={index} to={`/subcategoryPage`}>
            <div key={subcategory.id} className="p-4 border rounded-md">
              <img src={subcategory.image} alt='' className="w-full h-32 object-contain mb-2" />
              <h1 className='font-bold text-xl'>Subcategory: {subcategory.subcategory_name}</h1>
              <h3 className="font-medium mb-1">{subcategory.key_elements.slice(0, 100)}.</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryArtCraft;
