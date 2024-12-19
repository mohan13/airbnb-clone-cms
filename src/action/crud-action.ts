import toast from 'react-hot-toast';
import axiosInstance from '../config/axios';
import { queryClient } from '../main';

export const submitPost = async (
  formData: any | FormData,
  setSubmitting: any,
  path: string,
) => {
  try {
    setSubmitting(true);
    const response = await axiosInstance.post(path, formData);
    if (response.status == 200) {
      toast.success('Added Successfully!');
      queryClient.invalidateQueries();
      return response.data;
    }
  } catch (error: any) {
    setSubmitting(false);
    toast.error(error.response.data?.message || 'Something went wrong!');
    return null;
  }
};

export const updatePost = async (
  formData: any | FormData,
  setSubmitting: any,
  path: string,
) => {
  try {
    setSubmitting(true);
    const response = await axiosInstance.patch(path, formData);
    if (response.status == 200 && response.data) {
      toast.success('Added Successfully!');
      queryClient.invalidateQueries();
      return response.data;
    }
  } catch (error: any) {
    setSubmitting(false);
    toast.error(error.response.data?.message || 'Something went wrong!');
  }
};
