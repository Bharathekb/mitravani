import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

export const sendMessage = async (message) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.post(
    `${API_BASE_URL}/send-message`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // Return server response
};

export const getMessages = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${API_BASE_URL}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
