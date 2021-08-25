import axios from "axios";
import { API_URL } from "./constants";

const customInstance = axios.create({
  baseURL: API_URL,
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    return Promise.reject(error);
  });

export default customInstance;  