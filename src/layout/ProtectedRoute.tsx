import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (token) {
      setLoader(false);
    } else {
      navigate('/auth/signin');
    }
  }, [token]);
  return !loader ? 'loading' : <>{children}</>;
};
