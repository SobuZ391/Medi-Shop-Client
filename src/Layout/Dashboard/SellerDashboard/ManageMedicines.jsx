import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';

const image_hosting_key = "8954c730e8c64d440537819fbd7d93c3";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageMedicines = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [uploadTime, setUploadTime] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const res = await axios.get('https://y-plum-nine.vercel.app/products');
                setMedicines(res.data);
            } catch (error) {
                console.error("Error fetching medicines:", error);
            }
        };

        fetchMedicines();
    }, []);

    const onSubmit = async (data) => {
        const startTime = Date.now();
        setUploadTime(null);

        try {
            // Prepare form data for image upload
            const formDataImage = new FormData();
            formDataImage.append('image', data.image[0]);

            const formDataCategoryImage = new FormData();
            formDataCategoryImage.append('image', data.categoryImage[0]);

            // Upload main image
            const imageRes = await axios.post(image_hosting_api, formDataImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            // Upload category image
            const categoryImageRes = await axios.post(image_hosting_api, formDataCategoryImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (imageRes.data.success && categoryImageRes.data.success) {
                const newMedicine = {
                    name: data.name,
                    genericName: data.genericName,
                    description: data.description,
                    categoryName: data.categoryName,
                    categoryImage: categoryImageRes.data.data.display_url,
                    company: data.company,
                    massUnit: data.massUnit,
                    price: parseFloat(data.price),
                    discountPrice: parseFloat(data.discountPrice) || 0,
                    image: imageRes.data.data.display_url
                };

                // Send the new medicine data to your backend
                const medicineRes = await axios.post('https://y-plum-nine.vercel.app/products', newMedicine);
                if (medicineRes.data.id) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is added to the menu.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    closeModal();
                    setMedicines([...medicines, newMedicine]); // Update the state with the new medicine
                } else {
                    throw new Error('Failed to add medicine');
                }
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        } finally {
            const endTime = Date.now();
            const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
            setUploadTime(elapsedTime);
        }
    };

    return (
        <div className="container mx-auto px-4">
        <h1 className='text-3xl font-bold text-center border-y-2 p-2  w-72 mx-auto '>Manage Medicines</h1>
           <div className='border-2 rounded-xl '>
           <h1 className='text-2xl font-bold p-2 m-2 border-b-2 w-72 mx-auto' >Medicine Add Section</h1>
           <button className="btn p-4 mx-auto w-full border-2 btn-accent" onClick={openModal}>
                Add Medicine <FaUtensils className="ml-4" />
            </button>
           </div>
            
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-2xl font-bold mb-4">Add a Medicine</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Medicine Name*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Medicine Name"
                                    {...register('name', { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Generic Name*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Generic Name"
                                    {...register('genericName', { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Short Description*</span>
                                </label>
                                <textarea
                                    placeholder="Short Description"
                                    {...register('description', { required: true })}
                                    className="textarea textarea-bordered h-24"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Category*</span>
                                </label>
                                <select defaultValue="default" {...register('categoryName', { required: true })}
                                    className="select select-bordered w-full">
                                    <option disabled value="default">Select a category</option>
                                    <option value="tablet">Tablet</option>
                                    <option value="syrup">Syrup</option>
                                    <option value="injection">Injection</option>
                                    <option value="cream">Cream</option>
                                    <option value="antibiotic capsule">Antibiotic Capsule</option>
                                    <option value="spray">Spray</option>
                                    <option value="solution">Solution</option>
                                    <option value="supplement">Supplement</option>
                                    <option value="soap">Soap</option>
                                </select>
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Company*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Company"
                                    {...register('company', { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Mass Unit (Mg or ML)*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Mass Unit"
                                    {...register('massUnit', { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Price per Unit*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    {...register('price', { required: true })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Discount Percentage</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Discount"
                                    {...register('discountPrice')}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Image*</span>
                                </label>
                                <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Category Image*</span>
                                </label>
                                <input {...register('categoryImage', { required: true })} type="file" className="file-input w-full max-w-xs" />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="button" className="btn mr-2" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Item</button>
                            </div>
                        </form>
                        {uploadTime !== null && (
                            <div className="mt-4 text-center">
                                <p>Image uploaded in {uploadTime} seconds</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Medicines List</h2>
                <table className="table-auto w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2">Name</th>
                            <th className="border border-gray-400 px-4 py-2">Generic Name</th>
                            <th className="border border-gray-400 px-4 py-2">Description</th>
                            <th className="border border-gray-400 px-4 py-2">Category</th>
                            <th className="border border-gray-400 px-4 py-2">Company</th>
                            <th className="border border-gray-400 px-4 py-2">Mass Unit</th>
                            <th className="border border-gray-400 px-4 py-2">Price</th>
                            <th className="border border-gray-400 px-4 py-2">Discount Price</th>
                            <th className="border border-gray-400 px-4 py-2">Image</th>
                            <th className="border border-gray-400 px-4 py-2">Category Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{medicine.name}</td>
                                <td className="border border-gray-400 px-4 py-2">{medicine.genericName}</td>
                                <td className="border border-gray-400 px-4 py-2">{medicine.description}</td>
                                <td className="border border-gray-400 px-4 py-2">{medicine.categoryName}</td>
                                <td className="border border-gray-400 px-4 py-2">{medicine.company}</td>
                                <td className="border border-gray-400 px-4 py-2">{medicine.massUnit}</td>
                                <td className="border border-gray-400 px-4 py-2">{medicine.price}</td>
                                <td className="border border-gray-400 px-4 py-2">{medicine.discountPrice}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <img src={medicine.image} alt={medicine.name} className="w-16 h-16 object-cover mx-auto" />
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <img src={medicine.categoryImage} alt={medicine.categoryName} className="w-16 h-16 object-cover mx-auto" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMedicines;
