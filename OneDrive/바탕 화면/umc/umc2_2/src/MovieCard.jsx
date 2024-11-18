import React from 'react';

const MovieCard = ({ movie, onSelect, imageIndex }) => { // 세가지 props를 받음
    const cardStyle = {
      cursor: 'pointer',
      margin: '5px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      overflow: 'hidden'
    };
  
    const imageStyle = {
      width: '150px',
      height: '225px',
      display: 'block'
    };
  
    const imageUrl = `/images/movie${imageIndex}.jpg`;
  
    return (
      <div style={cardStyle} onClick={() => onSelect(movie)}>
        <img 
          src={imageUrl} // 이미지 로드
          alt={movie.title} // 영화 제목
          style={imageStyle}
          onError={(e) => { e.target.onerror = null; e.target.src="/images/fallback.jpg"; }}  // 대체 이미지
        />
      </div>
    );
  };

  export default MovieCard;
  