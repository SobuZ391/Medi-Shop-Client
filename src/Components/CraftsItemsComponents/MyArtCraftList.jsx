import { Link, useLoaderData } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { FaStar } from 'react-icons/fa';
import { MdDelete, MdSystemUpdateAlt } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useState } from 'react';

const MyArtCraftList = () => {
    const loadedMyCraftItemsData = useLoaderData();
    const { user } = useAuth();
    
    const [myArtCraftItemsData, setMyArtCraftItemsData] = useState(loadedMyCraftItemsData);
    const userCraftItems = myArtCraftItemsData.filter(item => item.email === user.email);

    const [selectedCustomization, setSelectedCustomization] = useState('all');
    const handleCustomizationChange = (e) => {
        setSelectedCustomization(e.target.value);
    };
  
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://art-craft-store-server-lyart.vercel.app/myCraftItem/${_id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Craft Item has been deleted.",
                            icon: "success"
                        });
                        const remaining = myArtCraftItemsData.filter(craftData => craftData._id !== _id);
                        setMyArtCraftItemsData(remaining);
                    }
                })
                .catch(error => {
                    console.error('Error deleting craft item:', error);
                });
            }
        });
    }

    const filteredItems = selectedCustomization === 'all' ? userCraftItems : userCraftItems.filter(item => item.customization === selectedCustomization);

    return (
        <>
            <div>
                <div className="filter-container btn flex justify-center  w-52 mx-auto my-10 shadow-xl">
                    <label htmlFor="customization-filter">Customization:</label>
                    <select className='rounded-sm font-bold' id="customization-filter" value={selectedCustomization} onChange={handleCustomizationChange}>

                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="all">All</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className=" w-[90%] lg:container mx-auto grid grid-cols-1 lg:grid-cols-3">
                    {filteredItems.map(item => (
                        <div key={item._id} className="item ">
                            {/* Render your item here */}
                            <div className="lg:w-96  mt-4  p-4 rounded-md hover:shadow-xl transition-all ease-in-out bg-base-200   ">
                                <div className="flex justify-end pb-4 border-bottom">
                                    <div className="flex items-center">
                                        <a rel="noopener noreferrer" href="#" className=" bg-purple-700 shadow-xl glass rounded-xl px-4 py-1 font-semibold">{item.stockStatus}</a>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <img src={item.image} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                                        <div className="flex items-center justify-between px-4 text-xs">
                                            <span>{item.subcategory}</span>
                                            <span className="flex gap-1 items-center justify-center"> Rating: {item.rating} <FaStar className="text-yellow-400" /></span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <a rel="noopener noreferrer" href="#" className="block">
                                            <h3 className="text-xl font-semibold dark:text-violet-600">{item.itemName}</h3>
                                        </a>
                                        <p className="leading-snug ">{item.shortDescription}</p>
                                    </div>
                                    <div>
                                        <p>{item.price} USD</p>
                                    </div>
                                    <div className='flex justify-evenly'>
                                        <Link to={`/updateCraftItem/${item._id}`}><button className="btn btn-primary">Update <MdSystemUpdateAlt /></button></Link>
                                        <button onClick={() => handleDelete(item._id)} className="btn bg-warning">Delete <MdDelete /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyArtCraftList;
