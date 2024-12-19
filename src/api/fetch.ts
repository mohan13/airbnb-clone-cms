import axiosInstance from '../config/axios';

export const fetchData = async (path: string) => {
  if (path.split('/').pop() == 'undefined') {
    return null;
  } else {
    try {
      const response = await axiosInstance.get(`${path}`);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
};
