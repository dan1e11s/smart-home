import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

export const authContext = createContext();
export const useAuth = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const register = async (obj) => {
    try {
      const res = await axios.post(`${api}/user/create/`, obj);
      console.log(res);
      localStorage.setItem('username', obj.username);
      setUser(obj.username);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError('Error occured');
    }
  };

  const login = async (obj) => {
    try {
      let { data } = await axios.post(`${api}/auth`, obj);
      localStorage.setItem('token', JSON.stringify(data));
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError('Wrong email or password');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser('');
    navigate('/');
  };

  const checkAuth = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      if (token) {
        let { data } = await axios(`${api}/auth/isAuth`, {
          headers: { Authorization: `Bearer ${token?.data?.access_token}` },
        });
        if (!data.success) navigate('/');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setError('Error with check auth!');
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        error,

        register,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
