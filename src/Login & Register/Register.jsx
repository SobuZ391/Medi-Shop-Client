import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from './../Hooks/useAuth';
import SocialLogin from "./SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Navigation systems
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // Function to verify the password based on the given criteria
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

  const onSubmit = (data) => {
    const { email, password, image, fullName, role } = data;

    // Verify the password
    if (!verifyPassword(password)) {
      return;
    }

    // Create the user and update the profile
    createUser(email, password)
      .then(() => {
        updateUserProfile(fullName, image)
          .then(() => {
            // Create user entry in the database
            const userInfo = {
              name: fullName,
              email: email,
              role: role,
              image: image
            };

            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  // Display success toast after successful registration and profile update
                  toast.success("Registration successful! Welcome!");

                  // Delay navigation by 1 second (1000ms) to allow the toast to be displayed
                  setTimeout(() => {
                    navigate(from);
                  }, 1000);
                }
              })
              .catch(error => {
                toast.error("Failed to create user in the database: " + error.message);
              });
          })
          .catch((error) => {
            toast.error("Failed to update user profile: " + error.message);
          });
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.message);
      });
  };

  return (
    <>
      <div
        className="hero flex justify-center items-center min-h-screen bg-base-200"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715385600&semt=ais_user)`
        }}
      >
        <div className="w-full mx-auto lg:w-[40rem]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[90%] mx-auto shadow-2xl rounded-xl bg-gray-300 glass"
          >
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-center mt-20 p-3 rounded-t-xl text-gray-900">
                Welcome
              </h1>
              <p className="text-center">
                Please enter your credentials to Sign Up!
              </p>
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
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
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
                  <span className="label-text">Password</span>
                </label>
                <div className="input-group flex items-center">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-[90%]"
                    {...register("password", { required: true })}
                  />
                  {/* Eye icon to toggle password visibility */}
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="input input-bordered"
                  {...register("role", { required: true })}
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
                {errors.role && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control mt-6 p-0">
                <button
                  type="submit"
                  className="btn bg-gray-800 border-2 text-white text-xl shadow-xl"
                >
                  Register
                </button>
              </div>
              <label className="label text-lg">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="label-text-alt link link-hover text-lg rounded-xl p-2 glass"
                >
                  Please Login
                </Link>
              </label>
              <SocialLogin />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
