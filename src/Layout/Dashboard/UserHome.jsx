import React from 'react';
import useAuth from '../../Hooks/useAuth';
import UserDashboard from '../../Dashboard/UserDashboard/UserDashboard';
import UpdateProfile from '../../Login & Register/UpdateProfile';

const UserHome = () => {
    const {user}=useAuth()
    return (
        <div>
            <h2 className='text-3xl' >
                <span>Hi,Welcome </span>
                {
                    user?.displayName?  user.displayName :'back'
                }
                
            </h2>
        </div>
    );
};

export default UserHome;