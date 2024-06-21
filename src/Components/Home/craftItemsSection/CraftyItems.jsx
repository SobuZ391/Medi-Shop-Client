import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';


const CraftyItems = ({craftyItem}) => {
    
    const {_id,subcategory,image,itemName,shortDescription, price, rating,stockStatus}=craftyItem;
    
    return (
        <div className=" w-[90%]  m-2  mx-auto p-4  rounded-md hover:shadow-lg transition-all ease-in-out border  font-semibold">
        <div className="flex justify-between pb-4 border-bottom">
            <div className="flex items-center">
                <a rel="noopener noreferrer" href="#" className="mb-0  font-medium shadow-sm rounded-md p-1 text-red-500">{stockStatus}</a>
            </div>
           
        </div>
        <div className="space-y-4  ">
            <div className="space-y-2 ">
                <img src={image} alt="" className="block object-cover object-center w-full rounded-md h-72" />
                <div className="flex items-center justify-between px-4 text-xs">
                    <span>{subcategory}</span>
                    <span className="flex gap-1 items-center justify-center" > Rating: {rating} <FaStar className="text-yellow-400" /></span>
                </div>
                
            </div>
            <div className="space-y-2">
                <a rel="noopener noreferrer" href="#" className="block">
                    <h3 className="text-xl font-semibold dark:text-violet-600">{itemName}</h3>
                </a>
                <p className="leading-snug dark:text-gray-600 font-semibold">{shortDescription}</p>
            </div>
            <div>
                <p>{price} USD</p>
            </div>
            <div>
            <Link to={`/viewDetails/${_id}`} ><button className="btn w-full bg-purple-500 " > View Details</button></Link>
            </div>
        </div>
        
    </div>
    );
};

export default CraftyItems;