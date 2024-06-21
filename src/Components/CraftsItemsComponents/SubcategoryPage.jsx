import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useLoaderData, useParams } from 'react-router-dom';



const SubcategoryPage = ({ subcategories }) => {
  const loadedUsers = useLoaderData();
 
  
    return (
      <div className="w-[90%] grid grid-cols-1 lg:grid-cols-3 gap-10 m-2 mx-auto p-4 rounded-md hover:shadow-lg transition-all ease-in-out border font-semibold">
      {loadedUsers.map((craftData, index) => (
        <div key={index} className="space-y-4 border p-2 rounded-xl">
          <div className="space-y-2">
            <img src={craftData.image} alt="" className="block object-cover object-center w-full rounded-md h-72" />
            <div className="flex items-center justify-between px-4 text-xs">
              <span>{craftData.subcategory}</span>
              <span className="flex gap-1 items-center justify-center">Rating: {craftData.rating} <FaStar className="text-yellow-400" /></span>
            </div>
          </div>
          <div className="space-y-2">
            <Link to={`/viewDetails/${craftData._id}`} className="block">
              <h3 className="text-xl font-semibold dark:text-violet-600">{craftData.itemName}</h3>
            </Link>
            <p className="leading-snug dark:text-gray-600 font-semibold">{craftData.shortDescription}</p>
          </div>
          <div>
            <p>{craftData.price} USD</p>
          </div>
          <div>
            <Link to={`/viewDetails/${craftData._id}`}><button className="btn w-full bg-purple-500">View Details</button></Link>
          </div>
        </div>
      ))}
    </div>
    
    );
};

export default SubcategoryPage;
