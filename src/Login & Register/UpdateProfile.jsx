import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet-async';

const UpdateProfile = () => {
  const { user, updateUserProfile, updateUserEmail, updateUserPassword } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue("fullName", user.displayName);
      setValue("email", user.email);
      setValue("image", user.photoURL);
    }
  }, [user, setValue]);

  const verifyPassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasValidLength = password.length >= 6;

    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }

    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }

    if (!hasNumeric) {
      toast.error("Password must contain at least one number.");
      return false;
    }

    if (!hasValidLength) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const onSubmit = async (data) => {
    const { fullName, email, image, password } = data;

    try {
      // Update profile information
      await updateUserProfile({ displayName: fullName, photoURL: image });

      // Update email if provided (although we are making it read-only here)
      // await updateUserEmail(email); // Commented out as we're making email read-only

      // Update password if provided and valid
      if (password && verifyPassword(password)) {
        await updateUserPassword(password);
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        timer: 3000,
        timerProgressBar: true,
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    }
  };

  return (
    <>
      <div className="hero flex justify-center items-center min-h-screen bg-base-200" style={{ backgroundImage: `url(https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715385600&semt=ais_user)` }}>
      <Helmet>
        <title>Medi-Shop | Profile Update</title>
       
      </Helmet>
        <div className="w-full mx-auto lg:w-[40rem]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] mx-auto shadow-2xl rounded-xl bg-gray-300 glass">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-center mt-20 p-3 rounded-t-xl text-gray-900">
                Update Profile
              </h1>
              <p className="text-center">Update your profile information</p>
            </div>

            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="input input-bordered"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email")}
                  readOnly // Make email field read-only
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered"
                  {...register("image")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <div className="input-group flex items-center">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="New Password"
                    className="input input-bordered w-[90%]"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="form-control mt-6 p-0">
                <button type="submit" className="btn bg-gray-800 border-2 text-white text-xl shadow-xl">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProfile;
