import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../API/axioInstance';

const usePaginatedMovies = (endpoint) => {
    const [page, setPage] = useState(1);

    const fetchMovies = async (page) => {
        const response = await axiosInstance.get(`${endpoint}?page=${page}`);
        return response.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: [endpoint, page], 
        queryFn: () => fetchMovies(page), 
        keepPreviousData: true, 
    });

    const goToNextPage = () => setPage((prev) => prev + 1);
    const goToPrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev)); 

    return { data, isLoading, isError, page, goToNextPage, goToPrevPage };
};

export default usePaginatedMovies;