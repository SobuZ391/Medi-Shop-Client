import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { axiosSecure } from '../../Hooks/useAxiosSecure';

const BannerManagement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await axiosSecure.get('/admin/advertisements');
      console.log('Fetched advertisements:', response.data);
      setAdvertisements(response.data);
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch advertisements. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSlideStatus = async (id, currentStatus) => {
    console.log('Toggling slide status for ID:', id);
    if (!id) {
      console.error('Invalid advertisement ID:', id);
      return;
    }
    try {
      await axiosSecure.patch(`/admin/advertisements/${id}`, { in_slide: !currentStatus });
      fetchAdvertisements();
    } catch (error) {
      console.error('Error updating slide status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update slide status. Please try again later.',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Medicine Image</th>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Seller Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((ad) => (
              <tr key={ad._id}>
                <td><img src={ad.image} alt={ad.mediName} className="w-16 h-16 object-cover" /></td>
                <td>{ad.mediName}</td>
                <td>{ad.description}</td>
                <td>{ad.sellerEmail}</td>
                <td>
                  <button
                    className={`btn ${ad.in_slide ? 'btn-error' : 'btn-success'}`}
                    onClick={() => toggleSlideStatus(ad._id, ad.in_slide)}
                  >
                    {ad.in_slide ? 'Remove from Slide' : 'Add to Slide'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BannerManagement;
