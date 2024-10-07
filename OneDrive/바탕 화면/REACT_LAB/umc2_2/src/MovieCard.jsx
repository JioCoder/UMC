import React from 'react';

const MovieCard = ({ movie, onSelect, imageIndex }) => {
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
  
    // 이미지 경로가 올바르게 설정되었는지 확인하세요
    const imageUrl = `/images/movie${imageIndex}.jpg`;
  
    return (
      <div style={cardStyle} onClick={() => onSelect(movie)}>
        <img 
          src={imageUrl}
          alt={movie.title} 
          style={imageStyle}
          onError={(e) => { e.target.onerror = null; e.target.src="/images/fallback.jpg"; }}  // 대체 이미지 설정
        />
      </div>
    );
  };

  export default MovieCard;
  