import React from 'react'; 
import useCustomFetch from '../hooks/useCustomFetch';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';

const TopRatedPage = () => {
    const { data: movies, isLoading, isError } = useCustomFetch('/movie/top_rated');
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div>
                <h2 style={{ color: 'white' }}>Loading</h2>
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <h2 style={{ color: 'white' }}>Error!</h2>
            </div>
        );
    }

    const handleCardClick = (id) => {
        navigate(`/movies/${id}`);
    };

    return (
        <HomeContainer>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date}
                    onClick={() => handleCardClick(movie.id)}
                />
            ))}
        </HomeContainer>
    );
};

export default TopRatedPage;

const HomeContainer = styled.div`
    background-color: #000;
    justify-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    gap: 10px;
`;    
