import useAxiosSecure from "./useAxiosSecure";

const useApi = () => {
  const axiosSecure = useAxiosSecure();

  const getUsers = async () => {
    const response = await axiosSecure.get('/users');
    return response.data;
  };

  const promoteToAdmin = async (userId) => {
    const response = await axiosSecure.patch(`/users/admin/${userId}`);
    return response.data;
  };

  const promoteToSeller = async (userId) => {
    const response = await axiosSecure.patch(`/users/seller/${userId}`);
    return response.data;
  };

  const downgradeToUser = async (userId) => {
    const response = await axiosSecure.patch(`/users/user/${userId}`);
    return response.data;
  };

  return {
    getUsers,
    promoteToAdmin,
    promoteToSeller,
    downgradeToUser,
  };
};

export default useApi;
