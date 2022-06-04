import Axios from 'axios';
import { getCookie } from 'cookies-next';

const token = getCookie('token');

export default Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    'X-Requested-With': 'XMLHttpRequest',
  },
});
