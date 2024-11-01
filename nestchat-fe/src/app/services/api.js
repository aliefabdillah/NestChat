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

export const getChats = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const uploadFile = async (token, chatId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/chat/${chatId}/file`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProfile = async (token, userData) => {
  try {
    const response = await axios.put(`${API_URL}/user/me`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const downloadFile = async (token, chatId, fileId) => {
  try {
    const response = await axios.get(`${API_URL}/chat/${chatId}/file/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getFiles = async (token, chatId) => {
  try {
    const response = await axios.get(`${API_URL}/chat/${chatId}/file`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // Redirect to login page
};