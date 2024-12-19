import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/fetch';

export const useFetch = (path: string) => {
  const [_, key, id] = path.split('/');
  return useQuery({
    queryKey: id ? [key, id] : [key],
    queryFn: () => fetchData(path),
  });
};
