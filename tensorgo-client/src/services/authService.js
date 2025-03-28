import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, userData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const register = async (userData) => {
  return await axios.post(`${API_URL}/api/auth/register`, userData);
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { login, register, logout };
