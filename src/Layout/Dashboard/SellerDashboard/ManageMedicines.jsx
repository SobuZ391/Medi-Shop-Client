import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const image_hosting_key = "8954c730e8c64d440537819fbd7d93c3";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageMedicines = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [uploadTime, setUploadTime] = useState(null);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('https://y-plum-nine.vercel.app/categories');
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    // Get current medicines
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredMedicines = medicines.filter(medicine =>
        medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedMedicines = filteredMedicines.sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);
    const currentMedicines = sortedMedicines.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

    return (
        <div className="container mx-auto px-4">
            <Helmet>
                <title>Medi-Shop | Dashboard | Manage Medicine</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center border-y-2 p-2 w-72 mx-auto'>Manage Medicines</h1>
            <div className='border-2 rounded-xl'>
                <h1 className='text-2xl font-bold p-2 m-2 border-b-2 w-72 mx-auto'>Medicine Add Section</h1>
                <button className="btn p-4 mx-auto w-full border-2 btn-accent" onClick={openModal}>
                    Add Medicine <FaUtensils className="ml-4" />
                </button>
            </div>

            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-2xl font-bold mb-4">Add a Medicine</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* form inputs */}
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
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.categoryName}>{category.categoryName}</option>
                                    ))}
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
                                    <span className="label-text">Price*</span>
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
                                    <span className="label-text">Discount Price</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Discount Price"
                                    {...register('discountPrice')}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Medicine Image*</span>
                                </label>
                                <input
                                    type="file"
                                    {...register('image', { required: true })}
                                    className="file-input file-input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text">Category Image*</span>
                                </label>
                                <input
                                    type="file"
                                    {...register('categoryImage', { required: true })}
                                    className="file-input file-input-bordered w-full"
                                />
                            </div>
                            <input className="btn btn-accent mt-4 w-full" type="submit" value="Add Medicine" />
                        </form>
                        {uploadTime && (
                            <div className="mt-4">
                                <p>Upload Time: {uploadTime.toFixed(2)} seconds</p>
                            </div>
                        )}
                        <div className="modal-action">
                            <button className="btn btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='border-2 rounded-xl mt-4'>
                <h1 className='text-2xl font-bold p-2 m-2 border-b-2 w-72 mx-auto'>Medicine List Section</h1>
                <div className='flex justify-between p-4'>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered w-full max-w-xs"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button className="btn btn-accent" onClick={handleSort}>
                        Sort by Price {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Generic Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Company</th>
                                <th>Mass Unit</th>
                                <th>Price</th>
                                <th>Discount Price</th>
                                <th>Image</th>
                                <th>Category Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMedicines.map((medicine, index) => (
                                <tr key={index}>
                                    <td>{medicine.name}</td>
                                    <td>{medicine.genericName}</td>
                                    <td>{medicine.description}</td>
                                    <td>{medicine.categoryName}</td>
                                    <td>{medicine.company}</td>
                                    <td>{medicine.massUnit}</td>
                                    <td>{medicine.price}$</td>
                                    <td>${medicine.discountPrice}</td>
                                    <td><img src={medicine.image} alt="Medicine" className="w-20 h-20 object-cover" /></td>
                                    <td><img src={medicine.categoryImage} alt="Category" className="w-20 h-20 object-cover" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-center'>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
                                onClick={() => paginate(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageMedicines;
