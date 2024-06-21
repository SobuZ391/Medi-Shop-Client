
import { FaStar } from 'react-icons/fa';
import {  useLoaderData } from 'react-router-dom';

const ViewDetails = () => {
   
    const singleCrafts = useLoaderData();
   

    const {image,itemName,shortDescription,stockStatus,price,rating,customization,email,subcategory ,name}= singleCrafts || {};
   
   

   

    return (
        <div className='flex gap-5 my-16 border  flex-col shadow-xl lg:p-24 rounded-xl'>

        
          <img className='lg:w-[700px] shadow-xl border-2  mx-auto w-100% lg:h-[400px;] object-cover rounded-xl ' src={image} alt="" />
           
         
           <div className='border-2 border-dashed  p-4' >
                <h2 className='lg:mb-4  text-xl lg:text-5xl font-semibold'><span className='text-cyan-500 font-medium shadow-lg rounded-lg '> {itemName} </span> </h2>
               <div className='flex flex-col lg:flex-row justify-between my-2'>
               <h2 className='btn btn-sm lg:text-xl shadow-xl   text-gray-600 bg-gray-300'>Subcategory :<span className=''> {subcategory} </span> </h2>
                <h2 className='rounded-lg bg-gray-200 px-2  lg:text-lg shadow-xl '>Stock Status : <span className='text-red-500 text-xl font-bold'> {stockStatus} </span> </h2>
               </div>
             
                <h2 className='lg:text-xl w-[100%] font-semibold border-y py-2'>Description:  <span className=''> {shortDescription} </span> </h2>
                
               
                <div className='lg:space-y-5 flex justify-evenly lg:flex-row flex-col lg:gap-16 gap-2 border-y rounded-xl my-2'>
                <h2 className='btn btn-ghost text-3xl text-red-600 font-bold border-red-400 shadow-xl mt-10'>Price: <span className=''> {price} </span> </h2>
               <div className='lg:py-2  '>
               <h2 className='btn md:w-[27rem] lg:text-xl shadow-lg  '>Author Name:<span className='text-accent'> {name} </span> </h2>
               <hr />
                 <h2 className='btn lg:w-[27rem]  lg:text-xl shadow-lg  '>Email: <span className='text-accent'> {email} </span> </h2>
               </div>
                 
             </div>
                <div className='flex lg:flex-row  flex-col  items-center  gap-2 lg:gap-5 my-4 '>
                    <h2 className='btn  lg:text-lg shadow-lg '>Rating <span className='flex gap-2' > {rating}<FaStar className='text-yellow-400 text-2xl   items-center' /> </span> </h2>
                    <h2 className='btn lg:text-lg'>Customization :<span className='text-success text-xl'> {customization} </span> </h2>
                </div>
              
            </div>

        </div>
    );
};



export default ViewDetails;
