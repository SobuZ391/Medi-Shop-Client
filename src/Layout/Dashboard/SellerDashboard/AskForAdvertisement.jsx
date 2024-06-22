import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const AskForAdvertisement = () => {
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAd, setNewAd] = useState({ image: '', name: '', description: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchReferredMedicines();
  }, []);

  const fetchReferredMedicines = async () => {
    try {
      const response = await axios.get('https://y-plum-nine.vercel.app/seller/referred-medicines', {
        params: { sellerEmail: user.email }
      });
      const data = response.data;
      setMedicines(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching referred medicines:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd({ ...newAd, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewAd({ ...newAd, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgbbApiKey = '8954c730e8c64d440537819fbd7d93c3';
      const formData = new FormData();
      formData.append('image', newAd.image);

      const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
      const imageUrl = imgbbResponse.data.data.url;

      const adData = {
        image: imageUrl,
        name: newAd.name,
        description: newAd.description,
        sellerEmail: user.email,
      };

      await axios.post('https://y-plum-nine.vercel.app/seller/advertisements', adData);

      setShowModal(false);
      fetchReferredMedicines();

      Swal.fire({
        icon: 'success',
        title: 'Advertisement Submitted',
        text: 'Your advertisement has been successfully submitted.',
      });
    } catch (error) {
      console.error('Error submitting advertisement:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to submit advertisement. ${error.response ? error.response.data.error : 'Please try again later.'}`,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button className="btn btn-primary mb-4" onClick={() => setShowModal(true)}>
        Add Advertisement
      </button>
      <table className="table w-full">
        <thead>
          <tr>
            <th  className='border'>Medicine Image</th>
            <th  className='border'>Medicine Name</th>
            <th  className='border'>Description</th>
            <th  className='border'>Status</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td className='border'><img src={medicine.image} alt={medicine.mediName} className="w-16 h-16 object-cover" /></td>
              <td className='border'>{medicine.mediName}</td>
              <td className='border'>{medicine.description}</td>
              <td className='border'>
        {medicine.in_slider ? 'In Slider' : 'Not in Slider'}
      </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl mb-4">Add Advertisement</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700">Medicine Image:</label>
                <input type="file" id="image" name="image" onChange={handleFileChange} required />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Medicine Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border rounded p-2"
                  value={newAd.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full border rounded p-2"
                  value={newAd.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskForAdvertisement;
