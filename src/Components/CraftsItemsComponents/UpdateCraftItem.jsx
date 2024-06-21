import { Navigate, useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const UpdateCraftItem = () => {
    const updateCraftItem =useLoaderData()
    const {_id, subcategory, image, itemName, shortDescription, price, rating, customization, stockStatus, processingTime } = updateCraftItem ;
   
   const { user } = useAuth() || {};
   // State to hold the creation timestamp
 
   const handleAddProduct = (e) => {
     e.preventDefault();
     
     const subcategory = e.target.subcategory.value;
     const image = e.target.image.value;
     const itemName = e.target.itemName.value;
     const shortDescription = e.target.shortDescription.value;
     const price = e.target.price.value;
     const rating = e.target.rating.value;
     const customization = e.target.customization.value;
     const stockStatus = e.target.stockStatus.value;
     const email = user?.email;
     const name = user?.displayName;
     const processingTime = e.target.ProcessingTime.value;
     
     const updatedData = {  subcategory, image, itemName, shortDescription, price, rating, customization, stockStatus, email, name,processingTime };
 
     fetch(`https://art-craft-store-server-lyart.vercel.app/myCraftItem/${_id}`, {
       method: "PUT",
       headers: { "Content-type": "application/json" },
       body: JSON.stringify(updatedData)
     })
       .then(res => res.json())
       .then(data => {
         if (data?.modifiedCount>0) {
           Swal.fire({
             title: 'Success!',
             text: 'Your Craft item Updated Successfully',
             icon: 'success',
             confirmButtonText: 'Confirm'
           });
         }
      
       })
       .catch(error => {
         console.error("Error:", error);
       });
   };
    return (
        <div className="lg:w-[60rem] mx-auto  pt-10">
        <div className="shadow-lg rounded-xl glass  bg-blue-900 dark:bg-green-900  p-5 border ">
          {/* Heading */}
          <div className="mt-5  mb-8">
            <p className="text-center glass rounded-md text-3xl font-semibold">
              <span className="mr-3 text-[#FF497C]">
                <i className="bx bxs-alarm-add"></i>
              </span>
              <span className="dark:text-white">
                <span className="text-[#FF497C]">
                  
                </span>
               Update Craft Item
              </span>
            </p>
          </div>
          {/* form */}
          <form onSubmit={handleAddProduct}>
            <div className="lg:flex gap-8 ">
              <div className="lg:flex-1" >
              <label className="block mt-2 mb-2 dark:text-white" htmlFor="subcategory">
                Subcategory Name
              </label>
              
              <select
                name="subcategory"
                id="subcategory"
                className="w-full p-2 text-gray-800  dark:bg-gray-200 rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="subcategory"
              >
                
                
                <option value="Landscape Painting:" selected>
                Landscape Painting
                </option>
                <option value=" Portrait Drawing" selected>
                Portrait Drawing
                </option>
             
                <option value="Floral Watercolor Art" selected>
                Watercolour Painting
                </option>
                <option value="Oil Painting" selected>
                Oil Painting
                </option>
                <option value="Charcoal Sketching" selected>
                Charcoal Sketching
                </option>
                <option value=" Cartoon Drawing" selected>
                Cartoon Drawing
                </option>
             
              </select>

  
              <label className="block mb-2 dark:text-white" htmlFor="image">
                  Image
                </label>
                <input
                  className="w-full p-2 dark:bg-white border rounded-md focus:outline-[#FF497C]"
                  type="text"
                  defaultValue={image}
                  placeholder="Enter Image URL"
                  id="image"
                  name="image"
                />
                <label className="block mb-2 dark:text-white" htmlFor="itemName">
                 Item Name
                </label>
                <input
                  className="w-full p-2  dark:bg-white rounded-md focus:outline-[#FF497C]"
                  type="text"
                  defaultValue={itemName}
                  placeholder=" Item Name"
                  id="itemName"
                  name="itemName"
                />
  
            
  
                <label
                  className="block mt-4 mb-2  dark:text-white"
                  htmlFor="shortDescription"
                >
                 Short Description
                </label>
                <input
                  className="w-full p-2  dark:bg-white rounded-md focus:outline-[#FF497C]"
                  type="text"
                  defaultValue={shortDescription}
                  placeholder="Enter Short Description"
                  id="shortDescription"
                  name="shortDescription"
                />
                <label
                  className="block mt-4 mb-2 dark:text-white"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="w-full p-2  dark:bg-white rounded-md focus:outline-[#FF497C]"
                  type="text"
                  defaultValue={price}
                  placeholder="Enter Price"
                  id="Price"
                  name="price"
                />
          
              
              <label
                  className="block  mb-2 dark:text-white"
                  htmlFor="UserEmail"
                >
                 User Email
                </label>
                <input
                  className="w-[100%] p-2  dark:bg-white rounded-md "
                  type="text"
                  placeholder={user?.email}
                  id="Email"
                  name="Email"
                  readOnly
                />
  
              </div>
           
              {/* Right side */}
              <div >
              <label
                  className="block mt-4 mb-2 dark:text-white"
                  htmlFor="customization"
                >
                 Customization
                </label>
                <select
                  name="customization"
                  id="customization"
                  className="w-full p-2 text-gray-800 dark:bg-gray-200 rounded-md focus:outline-[#FF497C]"
                  type="text"
                  defaultValue={customization}
                  placeholder="customization"
                >
                  
                  <option value="yes" selected>
                  Yes
                  </option>
                  <option value="no" selected>
                    No
                  </option>
               
                </select>
            
                <label className="block mt-2 dark:text-white" htmlFor="stockStatus">
                  Stock Status
                </label>
                <select
                  name="stockStatus"
                  id="stockStatus"
                  className="w-full p-2 text-gray-800  dark:bg-gray-200 rounded-md focus:outline-[#FF497C]"
                  type="text"
                  defaultValue={stockStatus}
                  placeholder="stockStatus"
                >
                  
                  <option value="In Stock" selected>
                  In Stock
                  </option>
                  <option value="Made to Order" selected>
                  Made to Order
                  </option>
               
                </select>
                <label
                  className="block mt-2 mb-2 dark:text-white"
                  htmlFor="rating"
                >
                  Rating
                </label>
                <input
                className="w-full p-2 dark:bg-white dark:text-black rounded-md focus:outline-[#FF497C]"
                maxLength={5}
                max={5.00}
                min={0.00}
                type="number"
                step="0.1"
                placeholder="Enter Rating (0.0 - 5.0)"
                id="rating"
                name="rating"
                />
               
  
              <label
                  className="block mt-2 mb-2 dark:text-white"
                  htmlFor="UserName"
                >
                  User Name
                </label>
                <input
                  className="w-full p-2  dark:bg-white   rounded-md "
                  type="read"
                  
                  placeholder={user?.displayName}
                  id="Name"
                  name="name"
                  readOnly
                />
               <div >
                {/* Other input fields */}
                <label className="block mt-2 mb-2 dark:text-white" htmlFor="ProcessiongTime">
                 Processing Time
                </label>
                
                <select
                  name="ProcessingTime"
                  id="processingTime"
                  className="w-full p-2 text-gray-800  dark:bg-gray-200 rounded-md focus:outline-[#FF497C]"
                  type="text"
                  defaultValue={processingTime}
                  placeholder="processingTime"
                >
                  
                  <option value="1-2 Days" selected>
                  2-3 Days
                  </option>
                  <option value="2-3 Days" selected>
                  2-5 Days
                  </option>
                  <option value=" 2-4 Days" selected>
                  1 Weeks
                  </option>
               
                  <option value="2-5 Days" selected>
                  2-3 Weeks
                  </option>
               
                </select>
              </div>
               
              </div>
            </div>
  
           <div className="w-1/2 mx-auto" >
           <input
              className="px-4 w-full py-2 mt-4  mx-auto rounded hover:bg-success bg-success glass   btn-primary duration-200 text-white cursor-pointer font-semibold"
              type="submit"
              value="Update Craft Item"
            />
           </div>
          </form>
        </div>
      </div>
    );
  };

export default UpdateCraftItem;