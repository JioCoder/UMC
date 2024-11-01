import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../API/axioInstance';
import styled from 'styled-components';

const MovieDetail = () => {
    const { movieId } = useParams(); //URL에서 영화 id 추출
    const [movieDetails, setMovieDetails] = useState(null); // 영화 세부 정보 저장
    const [castDetails, setCastDetails] = useState(null); // 출연진 정보 저장
 
    useEffect(() => {
        const fetchMovieData = async () => { // 비동기 함수 정의
            try {
                const movieResponse = await axiosInstance.get(`/movie/${movieId}`);
                setMovieDetails(movieResponse.data); // 영화 정보 저장

                const creditsResponse = await axiosInstance.get(`/movie/${movieId}/credits`);
                setCastDetails(creditsResponse.data); // 출연진 정보 저장
            } catch (error) {
                console.error("Error", error); // 오류 발생시 에러 메시지
            }
        };

        fetchMovieData(); // 함수 호출 -> 데이터 가져오기
    }, [movieId]); // movieID가 변경될 때마다 useEffect 실행됨

    return (
        !movieDetails || !castDetails ? (
            <LoadingContainer>Loading</LoadingContainer> // 로딩 메시지 출력
        ) : (
            <DetailWrapper>
                <BackdropContainer backdropUrl={movieDetails.backdrop_path}>
                    <TextBlock>
                        <MovieTitle>{movieDetails.title}</MovieTitle> 
                        <MovieRating>평균 {movieDetails.vote_average}</MovieRating> 
                        <MovieReleaseDate>개봉 {movieDetails.release_date}</MovieReleaseDate> 
                        <MovieOverview>{movieDetails.overview}</MovieOverview> 
                    </TextBlock>
                </BackdropContainer>

                <h2>감독/출연</h2>
                <ActorList>
                    {castDetails.cast.map((actor) => (
                        <Actor key={actor.id}>
                            {actor.profile_path ? (
                                <ActorImage 
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                                    alt={actor.name} 
                                /> // 프로필 사진이 있는 경우 이미지 출력
                            ) : (
                                <DefaultImage /> // 프로필 사진이 없는 경우 기본 이미지 출력
                            )}
                            <ActorName>{actor.name}</ActorName>
                            <ActorCharacter>({actor.character})</ActorCharacter>
                        </Actor>
                    ))}
                </ActorList>
            </DetailWrapper>
        )
    );
};

// 로딩중
const LoadingContainer = styled.div`
    color: white;
    text-align: center;
    font-size: 24px;
    margin-top: 50px;
`;

// 상세 정보
const DetailWrapper = styled.div`
    color: white;
    padding: 20px;
`;

// 배경 이미지 
const BackdropContainer = styled.div`
    background-image: url(${(props) => `https://image.tmdb.org/t/p/w500${props.backdropUrl}`});
    background-size: cover;
    background-position: center;
    position: relative;
    width: 100%;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    overflow: hidden;
`;

// 텍스트
const TextBlock = styled.div`
    position: relative;
    max-width: 650px;
    margin: 0;
    z-index: 2;
`;

// 영화 제목
const MovieTitle = styled.h1`
    margin: 0;
    font-size: 28px;
`;

// 평점
const MovieRating = styled.p`
    font-size: 20px;
`;

// 개봉 날짜
const MovieReleaseDate = styled.p`
    font-size: 18px;
`;

// 영화 개요
const MovieOverview = styled.p`
    font-size: 18px;
`;

const ActorList = styled.div`
    justify-content: flex-start; // 왼쪽 정렬
    display: flex;
    flex-wrap: wrap;
    gap: 15px; 
`;

const Actor = styled.div`
    flex-direction: column; // 세로 방향 정렬
    text-align: center;
    align-items: center;
    display: flex;
    flex: 0 0 12%;
    margin-bottom: 25px; 
`;

const ActorImage = styled.img`
    width: 80px; 
    height: 80px; 
    border-radius: 50%; 
    object-fit: cover;  // 비율에 맞게 크기 조정
    margin-bottom: 5px; 
`;

const DefaultImage = styled.div`
    width: 80px; 
    height: 80px; 
    border-radius: 50%;
    background-color: gray; 
    margin-bottom: 5px; 
`;

// 배우 역할
const ActorName = styled.span`
    font-size: 16px;
    font-weight: bold;
`;

// 배우 이름
const ActorCharacter = styled.span`
    font-size: 14px;
    color: #ccc;
`;

export default MovieDetail;
