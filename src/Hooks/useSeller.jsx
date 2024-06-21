import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSeller = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isSeller,  isPending: isSellerLoading } = useQuery({
    queryKey: [user?.email, 'isSeller'],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error('User email is not available');
      }
      const res = await axiosSecure.get(`/users/seller/${user.email}`);
      return res.data?.seller;
    }
    
  });

  return { isSeller,isSellerLoading };
};

export default useSeller;
