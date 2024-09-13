// base da URL https://api.themoviedb.org/3
// URL da api /movie/now_playing?api_key=6da9bc1126f946dc584fc9cf189df925
import axios from 'axios';

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
});
export default api;
