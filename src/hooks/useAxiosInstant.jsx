import axios from "axios";

const useAxiosInstant = () => {
    const axiosInstant = axios.create({
        baseURL: `http://localhost:5000`
    })
    return axiosInstant
};

export default useAxiosInstant;