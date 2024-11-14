import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_TMDB_MOVIE_URL, // 수정된 부분
    params: {
        api_key: process.env.REACT_APP_API_KEY, // 수정된 부분
        language: 'ko-KR',
    },
});

export default axiosInstance;
