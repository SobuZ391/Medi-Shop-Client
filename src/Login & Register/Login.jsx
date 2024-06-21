import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInUser(email, password);
      toast.success("Login successful! Welcome!");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      toast.error("Login failed: Make sure you submitted correct information");
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-full min-h-screen shadow-xl pt-20 glass"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715385600&semt=ais_user)`,
        }}
      >
        <div className="glass w-11/12 lg:w-3/4 xl:w-1/2 mx-auto grid lg:grid-cols-2 border-2 rounded-xl hover:shadow-xl h-full bg-white my-4">
          <div className="hidden lg:block rounded-l-3xl">
            <img
              className="h-full object-cover rounded-md"
              src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg"
              alt="Access Control"
            />
          </div>
          <div className="w-full shadow-2xl rounded-lg lg:border-none border-y-2 lg:rounded-r-3xl bg-base-100">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-center mt-20 p-3 rounded-xl text-gray-700">
                Welcome
              </h1>
              <p className="text-center text-gray-600">
                Please enter your credentials to Sign In!
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium mb-2 text-lg">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full border rounded-md bg-transparent border-gray-400"
                  {...register("email", { required: "Email is required" })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-lg">
                    Password
                  </span>
                </label>
                <div className="input-group flex items-center">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full border rounded-md bg-transparent border-gray-400"
                    {...register("password", { required: "Password is required" })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>
              <div className="form-control mt-6 p-0">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
              <label className="label">
                Don't have an account yet?
                <Link to="/signup" className="btn link link-hover">
                  Sign Up
                </Link>
              </label>
            </form>
            <SocialLogin />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
