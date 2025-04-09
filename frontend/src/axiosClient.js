import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  // Check if the URL matches the forgot password endpoint
  const isForgotPasswordEndpoint = config.url === "/auth/forgot_password/";

  // Only add the Authorization header if the token exists and the endpoint is not the forgot password endpoint
  if (token && !isForgotPasswordEndpoint) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          // Handle unauthorized, maybe redirect to login or refresh token
          localStorage.removeItem("ACCESS_TOKEN");
          // Notify the user (e.g., using a toast library)
          window.location.href = "/";
          break;

        case 403:
          alert("You do not have permission to perform this action.");
          break;

        case 500:
          alert("A server error occurred. Please try again later.");
          break;

        default:
          alert("An error occurred. Please try again.");
      }
    } else {
      alert("Network error. Please check your connection.");
    }

    throw error;
  }
);

export default axiosClient;
