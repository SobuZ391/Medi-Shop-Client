import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useSeller from "../Hooks/useSeller";

const Navbar = () => {
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const { logout, user } = useAuth();
    const { isAdmin } = useAdmin();
    const { isSeller } = useSeller();
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleAutoNavigation = async () => {
            if (!user && !isAdmin && !isSeller) {
                await logout(); // Ensure logout is called before navigation
                navigate('/');
            }
        };

        handleAutoNavigation();
    }, [user, isAdmin, isSeller, logout, navigate]);
    
    const toggleLangDropdown = () => {
        setIsLangDropdownOpen(prevState => !prevState);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangDropdownOpen(false);
    };
    
    const links = (
        <>
            <li>
                <Link to="/" className="btn mx-2 btn-ghost hover:bg-gray-500">{t('home')}</Link>
            </li>
            <li>
                <Link to="/shop" className="btn mx-2 btn-ghost hover:bg-gray-500">{t('shop')}</Link>
            </li>
            <li>
                <Link to="/cart">
                    <button className="btn w-[11rem] md:w-full btn-ghost ">
                    {t('cart')}<FaShoppingCart className="mr-2" />
                    </button>
                </Link>
            </li>
            {user && isAdmin && (
                <li>
                    <Link to="/dashboard/adminHome" className="btn  btn-ghost">{t('dashboard')}</Link>
                </li>
            )}
            {user && !isAdmin && isSeller && (
                <li>
                    <Link to="/dashboard/seller-dashboard" className="btn  btn-ghost">{t('dashboard')}</Link>
                </li>
            )}
            {user && !isAdmin && !isSeller && (
                <li>
                    <Link to="/dashboard/user-dashboard" className="btn btn-ghost ">{t('dashboard')}</Link>
                </li>
            )}
           
        </>
    );

    return (
        <div className="rounded-sm border-y-2 my-2 p-4">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown z-10">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                            <div className="relative btn btn-sm btn-success mx-4">
                                <button className="text-white" onClick={toggleLangDropdown}>{t('languages')}</button>
                                {isLangDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                                        <button onClick={() => changeLanguage('en')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">English</button>
                                        <button onClick={() => changeLanguage('fr')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Français</button>
                                    </div>
                                )}
                            </div>
                        </ul>
                    </div>
                    <Link to="/" className="lg:btn lg:btn-ghost lg:font-bold lg:w-[100%] text-sm flex w-[50%] lg:text-xl">
                        <div className="flex gap-2">
                            <img className="w-6 rounded-xl" src="/logo.png" alt="Logo" />
                            <h1 className="font-medium italic">Medi Shop</h1>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center px-1 ">{links}</ul>
                </div>

                <div className="navbar-end">
                    <div className="relative hidden lg:block btn btn-sm p-2 btn-success mx-4">
                        <button className="text-white" onClick={toggleLangDropdown}>{t('languages')}</button>
                        {isLangDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                                <button onClick={() => changeLanguage('en')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">English</button>
                                <button onClick={() => changeLanguage('fr')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Français</button>
                            </div>
                        )}
                    </div>
                  
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL || "/images/client3.png"} alt={user.displayName || "User"} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to="/update-profile" className="btn btn-sm btn-ghost">{t('updateProfile')}</Link>
                                </li>
                                <li>
                                    <button className="btn btn-sm btn-ghost" onClick={logout}>{t('logout')}</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="lg:gap-2 flex">
                            <Link to="/signup">
                                <button className="btn btn-sm">{t('joinUs')}</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
