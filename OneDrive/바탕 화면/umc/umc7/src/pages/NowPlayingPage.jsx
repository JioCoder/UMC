import React from 'react';
import MovieCard from '../components/MovieCard'; 
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../API/axioInstance';
import styled from 'styled-components';

const Skeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '25px', marginTop: '25px' }}>
        {[...Array(20)].map((_, idx) => (
            <div
                key={idx}
                style={{
                    height: '255px',
                    backgroundColor: '#888',
                    borderRadius: '15px',
                    animation: 'pulse 1.5s infinite ease-in-out',
                }}
            />
        ))}
    </div>
);

const fetchNowPlayingMovies = async () => {
    const response = await axiosInstance.get('/movie/now_playing');
    return response.data.results;
};

const NowPlayingPage = () => {
    const { data: movies = [], isLoading, isError } = useQuery({
        queryKey: ['nowPlayingMovies'],
        queryFn: fetchNowPlayingMovies,
    });
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <Container>
                <Skeleton />
            </Container>
        );
    }

    if (isError) {
        return <div>
            <h1 style={{color: 'white'}}>에러 중 입니다 ...</h1>
        </div>;
    }

    const handleCardClick = (id) => {
        navigate(`/movies/${id}`);
    };

    return (
        <Container>
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date}
                    onClick={() => handleCardClick(movie.id)}
                />
            ))}
        </Container>
    );
};

export default NowPlayingPage;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5px;
    background-color: #000;
    gap: 10px;
`;
