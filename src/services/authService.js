import http from "./httpService";
import { apiUrl } from "./config.json";

const apiEndPoint = `${apiUrl}/auth`;

export function login(user) {
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password
  });
}
