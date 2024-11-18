import React, { useState, useCallback } from 'react';  // useEffect 제거
import { debounce } from 'lodash';
import * as S from "../style/SearchStyle";
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import MovieCard from '../components/MovieCard';  // MovieCard 임포트

const Skeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '30px', marginTop: '30px' }}>
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

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);  
    const navigate = useNavigate();
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const [searchParams] = useSearchParams();  // setSearchParams만 제거
    const mq = searchParams.get('mq');

    const handleSearchMovie = useCallback(
        debounce(() => {
            if (!searchValue) return;
            if (mq === searchValue) return;
            setSearching(true); 
            navigate(`/search?mq=${searchValue}`); 
        }, 500), // 500ms의 딜레이 후 검색
        [searchValue, mq, navigate] 
    );

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
        }
    };

    const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoading, isError } = useCustomFetch(url);

    const renderContent = () => {
        if (isLoading && searching) return <Skeleton />;
        if (isError && searching) return <div>영화를 불러오는 데 오류가 발생했습니다.</div>;
        if (!searching) return null;  
        if (!Array.isArray(movies) || movies.length === 0) {
            return (
                <div style={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '18px'
                }}>
                    검색하신 '{searchValue}' 영화에 해당하는 데이터가 없습니다.
                </div>
            );
        }

        return (
            <S.MovieGridContainer>
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        release_date={movie.release_date}
                        onClick={() => navigate(`/movies/${movie.id}`)}  // 상세 페이지로 이동
                    />
                ))}
            </S.MovieGridContainer>
        );
    };

    return (
        <>
            <S.SearchContainer>
                <input 
                    placeholder='영화 제목을 입력해주세요 ...' 
                    value={searchValue} 
                    onChange={onChangeSearchValue} 
                    onKeyDown={handleSearchMovieWithKeyboard}
                />
                <button onClick={handleSearchMovie}>
                    검색
                </button>
            </S.SearchContainer>

            <div style={{ marginTop: '20px' }}>
                {renderContent()}
            </div>
        </>
    );
};

export default SearchPage;
