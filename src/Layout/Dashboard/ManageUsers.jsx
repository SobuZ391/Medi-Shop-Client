import React, { useState, useEffect } from 'react';
import useApi from '../../Hooks/useApi';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {
  const { getUsers, promoteToAdmin, promoteToSeller, downgradeToUser } = useApi();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, [getUsers]);

  const handlePromoteToAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be promoted to Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        promoteToAdmin(user._id).then(res => {
          if (res.modifiedCount > 0) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'User promoted to Admin',
            });
            setUsers(prevUsers => prevUsers.map(u => u._id === user._id ? { ...u, role: 'admin' } : u));
          }
        }).catch(err => Swal.fire('Error', err.message, 'error'));
      }
    });
  };

  const handlePromoteToSeller = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be promoted to seller",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        promoteToSeller(user._id).then(res => {
          if (res.modifiedCount > 0) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'User promoted to Seller',
            });
            setUsers(prevUsers => prevUsers.map(u => u._id === user._id ? { ...u, role: 'seller' } : u));
          }
        }).catch(err => Swal.fire('Error', err.message, 'error'));
      }
    });
  };

  const handleDowngradeToUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Seller will be downgraded to user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        downgradeToUser(user._id).then(res => {
          if (res.modifiedCount > 0) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Seller downgraded to User',
            });
            setUsers(prevUsers => prevUsers.map(u => u._id === user._id ? { ...u, role: 'user' } : u));
          }
        }).catch(err => Swal.fire('Error', err.message, 'error'));
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Medi-Shop | Dashboard | Manage Users</title>
       
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  {user.role === 'user' && (
                    <>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handlePromoteToSeller(user)}>
                        Promote to Seller
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => handlePromoteToAdmin(user)}>
                        Promote to Admin
                      </button>
                    </>
                  )}
                  {user.role === 'seller' && (
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDowngradeToUser(user)}>
                      Downgrade to User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
