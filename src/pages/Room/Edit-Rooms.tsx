import React from 'react';
import { PostRooms } from '../../components/Forms/Room/AddRoom';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

export const EditRooms = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(`/rooms/${id}`);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <PostRooms currentData={data} />;
};
