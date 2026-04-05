import axios from "axios";

const api = axios.create({
  baseURL: "https://moodify-music-player.onrender.com/",
  withCredentials: true,
});

//rgister user
export const register = async ({ email, username, password }) => {
  try {
    const response = await api.post("/register", { email, username, password });
    return {
      success: true,
      message: response.data.message,
      data: response.data.user,
    };
  } catch (error) {
    console.log(error.response);

    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

// login user
export const login = async ({ email, username, password }) => {
  try {
    const response = await api.post("/login", { email, username, password });
    return {
      success: true,
      message: response.data.message,
      data: response.data.user,
    };
  } catch (error) {
    console.log(error.response);

    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

// get me
export const getMe = async () => {
  try {
    const response = await api.get("/get-me", {});
    return {
      success: true,
      message: response.data.message,
      data: response.data.user,
    };
  } catch (error) {
    console.log(error.response);

    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

// logout user
export const logoutUser = async () => {
  try {
    const response = await api.post("/logout", {});
    return {
      success: false,
      data: {},
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
