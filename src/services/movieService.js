import http from "./httpService";
import { apiUrl } from "./config.json";

export function getMovies() {
  return http.get(`${apiUrl}/movies`);
}

export function getMovie(id) {
  return http.get(`${apiUrl}/movies/${id}`);
}

export function saveMovie(mov) {
  if (mov._id) {
    const body = { ...mov };
    delete body._id;
    return http.put(`${apiUrl}/movies/${mov._id}`, body);
  }

  return http.post(`${apiUrl}/movies/`, mov);
}

export function deleteMovie(id) {
  return http.delete(`${apiUrl}/movies/${id}`);
}
