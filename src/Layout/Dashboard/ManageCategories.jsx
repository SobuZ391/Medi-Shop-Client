import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const imageHostingKey = "8954c730e8c64d440537819fbd7d93c3";
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const ManageCategories = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosSecure.get("/categories");
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [axiosSecure]);

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        const res = await axiosPublic.post(imageHostingAPI, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            return res.data.data.display_url;
        }
        throw new Error('Image upload failed');
    };

    const onSubmit = async (data) => {
        try {
            let imageUrl;
            if (data.categoryImage[0]) {
                imageUrl = await uploadImage(data.categoryImage[0]);
            } else if (data.categoryImageUrl) {
                imageUrl = data.categoryImageUrl;
            } else {
                throw new Error('Image URL or File is required');
            }

            const categoryData = {
                categoryName: data.categoryName,
                categoryImage: imageUrl,
            };

            if (editMode) {
                const res = await axiosSecure.put(`/categories/${editingCategoryId}`, categoryData);
                if (res.data.modifiedCount > 0) {
                    setCategories(categories.map(cat => (cat._id === editingCategoryId ? { ...cat, ...categoryData } : cat)));
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Category updated successfully.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    setEditMode(false);
                    setEditingCategoryId(null);
                } else {
                    throw new Error('Failed to update category');
                }
            } else {
                const res = await axiosSecure.post("/categories", categoryData);
                if (res.data.insertedId) {
                    setCategories([...categories, { ...categoryData, _id: res.data.insertedId }]);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Category added successfully.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                } else {
                    throw new Error('Failed to add category');
                }
            }
        } catch (error) {
            console.error("Error submitting category:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Error submitting category: ${error.message}`,
                showConfirmButton: true,
            });
        }
    };

    const handleEdit = (category) => {
        setValue("categoryName", category.categoryName);
        setValue("categoryImageUrl", category.categoryImage);
        setEditMode(true);
        setEditingCategoryId(category._id);
    };

    const handleDelete = async (_id) => {
        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirmation.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/categories/${_id}`);
                if (res.status === 204) {
                    setCategories(categories.filter(cat => cat._id !== _id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your category has been deleted.",
                        icon: "success",
                    });
                } else {
                    throw new Error('Failed to delete category');
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Error deleting category: ${error.message}`,
                    showConfirmButton: true,
                });
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Manage Categories</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text">Category Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Category Name"
                            {...register('categoryName', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text">Category Image (URL or Upload)*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Category Image URL"
                            {...register('categoryImageUrl')}
                            className="input input-bordered w-full mb-2" />
                        <input {...register('categoryImage')} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn btn-primary w-full md:w-auto">
                        {editMode ? "Update Category" : "Add Category"}
                    </button>
                </form>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-center mb-4">Existing Categories</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border-b-2">Serial No</th>
                                <th className="py-2 px-4 border-b-2">Category Name</th>
                                <th className="py-2 px-4 border-b-2">Image</th>
                                <th className="py-2 px-4 border-b-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category._id} className="border-b">
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{category.categoryName}</td>
                                    <td className="py-2 px-4 text-center">
                                        <img className="w-10 h-10 object-contain mx-auto rounded-xl" src={category.categoryImage} alt='N/A' />
                                    </td>
                                    <td className="py-2 px-4 text-center flex justify-center gap-4">
                                        <button onClick={() => handleEdit(category)} className="btn btn-sm btn-warning"><FaEdit /></button>
                                        <button onClick={() => handleDelete(category._id)} className="btn btn-sm btn-danger"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCategories;
