import React, { useState } from 'react';
import { MOVIES } from './mocks/movies';
import MovieCard from './MovieCard';

const MoviesList = () => { // 함수형 컴포넌트 선언
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movie) => { // 영화를 선택할 때 호출
    setSelectedMovie(movie); // 선택된 영화의 정보를 저장
  };

  const listStyle = { // 영화 카드를 표시하는 div에 적용되는 스타일
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '20px 0'
  };

  const overlayStyle = {  // 선택된 영화의 정보를 전체화면 오버레이
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex', // 화면 중앙에 내용 정렬
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  return (
    <div style={listStyle}>
      {MOVIES.results && MOVIES.results.map((movie, index) => ( // movies.result 배열을 map함수로 순회 -> MovieCard 컴포넌트 렌더링
        <MovieCard key={movie.id} movie={movie} imageIndex={index + 1} onSelect={handleSelectMovie} />  // key프로퍼티로 영화 ID 사용 , onSelect 콜백으로 handleSelectMovie 함수전달 
      ))}
      {selectedMovie && (
        <div style={overlayStyle}>
          <p>{selectedMovie.title}</p>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
