     import { Link, useLoaderData } from "react-router-dom";
import { FaStar } from 'react-icons/fa';


                  const AllArtCraftItem = () => {
                    const loadedUsers = useLoaderData();

   return (
        <div>
                       
                        <div className="overflow-x-auto min-h-screen  my-4">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr className="bg-base-300">
                          <th></th>
                          <th>Name</th>
                          <th>Sub Category</th>
                          <th>Price</th>
                          <th>Rating</th>
                          <th>In Stock</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                       {
                        loadedUsers.map((craftItems,index)=>
                          <tr key={craftItems._id}>
                          <th>{index + 1}</th>
                          <td>{craftItems.itemName}</td>
                          <td>{craftItems.subcategory}</td>
                          <td>{craftItems.price} USD</td>
                          <td className="flex items-center gap-1" >{craftItems.rating} <FaStar className="text-yellow-500"></FaStar></td>
                          <td>{craftItems.stockStatus}</td>
                          <td> <Link to={`/viewDetails/${craftItems._id}`} ><button className="btn w-full btn-accent " > View Details</button></Link></td>
                        </tr>
                        
                        )
                       }
                    
                      </tbody>
                    </table>
                  </div>
                      </div>
           );
       };

   export default AllArtCraftItem;