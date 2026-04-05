import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getSongs = async ({ mood }) => {
  try {
    const response = await api.get(`/get/songs?mood=${mood}`);
    return {
      success: true,
      message: response.data.message,
      songs: response.data.song,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const getAllSong = async () => {
  try {
    const response = await api.get(`/getAll/songs`);
    return {
      success: true,
      message: response.data.message,
      songs: response.data.songs,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
const createNewSong = ({}) => {};
