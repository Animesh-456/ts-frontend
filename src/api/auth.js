import axios from 'axios';
import { backendURL } from '../common/links';
//Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
    baseURL: backendURL, // Replace with your API base URL
    timeout: 5000, // Set a timeout for API requests (optional)
});

export default axiosInstance;