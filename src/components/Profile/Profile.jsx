import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../helpers';
import { useAuth } from '../../contexts/AuthContext';

import style from './index.module.css';

const Profile = () => {
  const [date, setDate] = useState(null);
  const { checkAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const nowDate = new Date();
    setDate(formatDate(nowDate));
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className={style.profile}>
      <h2 style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
        Smart Home
      </h2>
      <div>{date}</div>
    </div>
  );
};

export default Profile;
