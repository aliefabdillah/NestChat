import axios from 'axios';

const API_URL = process.env.API_URL;

export const login = async (username, password) => {
  try {
    console.log(API_URL)
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};