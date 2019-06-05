import http from "./httpService";
import { apiUrl } from "./config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = `${apiUrl}/auth`;
const tokenKey = "token";

export async function login(user) {
  const { data: jwt } = await http.post(apiEndPoint, {
    email: user.username,
    password: user.password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function registerLogin(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}

export default {
  login,
  logout,
  registerLogin,
  getCurrUser
};
