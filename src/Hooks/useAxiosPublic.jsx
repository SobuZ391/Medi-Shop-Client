import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://y-plum-nine.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;