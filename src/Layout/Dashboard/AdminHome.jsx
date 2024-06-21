import React from 'react';
import useAuth from '../../Hooks/useAuth';
import UserDashboard from '../../Dashboard/UserDashboard/UserDashboard';

const AdminHome = () => {
    const {user}=useAuth()
    return (
        <div>
            <h2 className='text-3xl' >
                <span>Hi,Welcome </span>
                {
                    user?.displayName? user.displayName :'back'
                }
                <UserDashboard></UserDashboard>
                
            </h2>
        </div>
    );
};

export default AdminHome;