import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useSeller from "../../Hooks/useSeller";
import { FaBars, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const { isSeller } = useSeller();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 bg-orange-400 p-4">
      <button
      onClick={toggleMobileMenu}
      className="md:hidden bg-orange-500 text-white p-2 rounded"
    >
      {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
    </button>

        <ul className={`space-y-4 mt-4 md:block ${isMobileMenuOpen ? "block" : "hidden"}`}>
          {isAdmin && (
            <>
              <li className=" outline btn-primary text-center rounded-xl text-black bg-gray-400  font-bold text-xl">
                <NavLink
                  to="/"
                  className="block px-4 py-2  rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Home
                </NavLink>
              </li>
              <li className=" outline btn-primary text-center rounded-xl text-black bg-gray-400  font-bold text-xl">
                <NavLink
                  to="/dashboard/adminHome"
                  className="block px-4 py-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Admin Home
                </NavLink>
              </li>
              <li className=" outline btn-primary text-center rounded-xl text-black bg-gray-400  font-bold text-xl">
                <NavLink
                  to="/dashboard/manage-users"
                  className="block px-4 py-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Manage Users
                </NavLink>
              </li>
              <li className=" outline btn-primary text-center rounded-xl text-black bg-gray-400  font-bold text-xl">
                <NavLink
                  to="/dashboard/manage-categories"
                  className="block px-4 py-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Manage Categories
                </NavLink>
              </li>
              <li className=" outline btn-primary text-center rounded-xl text-black bg-gray-400  font-bold text-xl">
                <NavLink
                  to="/dashboard/payment-management"
                  className="block px-4 py-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Payment Management
                </NavLink>
              </li>
              <li className=" outline btn-primary text-center rounded-xl text-black bg-gray-400  font-bold text-xl">
                <NavLink
                  to="/dashboard/sales-report"
                  className="block px-4 py-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Sales Report
                </NavLink>
              </li>
              <li className=" outline btn-primary text-center rounded-xl text-black bg-gray-400  font-bold text-xl">
                <NavLink
                  to="/dashboard/banner-management"
                  className="block px-4 py-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Banner Management
                </NavLink>
              </li>
            </>
          )}

          {isSeller && (
            <div>
              <h1 className="text-2xl font-bold border-2 rounded-xl p-2 bg-gray-300">
                Seller Dashboard
              </h1>
              <li>
                <NavLink
                  to="/"
                  className="block px-4 py-2 my-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/user-dashboard"
                  className="block px-4 py-2 my-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-medicines"
                  className="block px-4 py-2 my-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Manage Medicine
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/advertisement"
                  className="block px-4 py-2 my-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Advertisement
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className="block px-4 py-2 my-2 rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Payment History
                </NavLink>
              </li>
            </div>
          )}

          {!isAdmin && !isSeller && (
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/"
                  className="block px-4 py-2 border-2 text-center font-semibold rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/update-profile"
                  className="block px-4 py-2 border-2 text-center font-semibold rounded hover:bg-orange-500"
                  activeClassName="bg-orange-500"
                >
                  Profile Update
                </NavLink>
              </li>
            </ul>
          )}
        </ul>
      </div>

      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
