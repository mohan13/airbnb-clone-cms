import toast from 'react-hot-toast';
import axiosInstance from '../config/axios';
import { queryClient } from '../main';

export const submitPost = async (formData: any | FormData, path: string) => {
  try {
    const response = await axiosInstance.post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status == 200) {
      toast.success('Added Successfully!');
      queryClient.invalidateQueries();
      return response.data;
    }
  } catch (error: any) {
    toast.error(error.response.data?.message || 'Something went wrong!');
    return null;
  }
};

export const updatePost = async (formData: any | FormData, path: string) => {
  try {
    const response = await axiosInstance.patch(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status == 200 && response.data) {
      toast.success('Updated Successfully!');
      queryClient.invalidateQueries();
      return response.data;
    }
  } catch (error: any) {
    toast.error(error.response.data?.message || 'Something went wrong!');
  }
};
