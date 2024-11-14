import { useEffect, useState } from "react";
import axiosInstance from "../API/axioInstance";

const useCustomFetch = (url) => {
    const [data , setdata] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(url);
                setdata(response.data.results);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return {data, isLoading, isError}
}

export default useCustomFetch;