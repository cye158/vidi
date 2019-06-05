import http from "./httpService";
import { apiUrl } from "./config.json";

const apiEndPoint = `${apiUrl}/movies`;

const movieUrl = id => {
  return `${apiEndPoint}/${id}`;
};

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(mov) {
  if (mov._id) {
    const body = { ...mov };
    delete body._id;
    return http.put(movieUrl(mov._id), body);
  }

  return http.post(`${apiUrl}/movies/`, mov);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
