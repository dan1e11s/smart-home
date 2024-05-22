import { useEffect } from 'react';
import { useDevice } from '../../contexts/DeviceContext';
import { useParams } from 'react-router-dom';
import { useRooms } from '../../contexts/RoomsContext';

import Device from '../Device/Device';
import Container from '../Container/Container';

import { capitalizeFirstLetter } from '../../helpers';

import style from './index.module.css';

const DevicesList = () => {
  const { devices, getDevices } = useDevice();
  const { getOneRoom, oneRoom, getCurrentHouse } = useRooms();

  const { id } = useParams();

  useEffect(() => {
    getDevices();
    getOneRoom(id);
    getCurrentHouse();
  }, [id]);

  return (
    <Container>
      <h3 style={{ textAlign: 'center' }}>
        {capitalizeFirstLetter(oneRoom?.name)}
      </h3>
      <div className={style.list}>
        {devices && devices.map((item) => <Device key={item.id} item={item} />)}
      </div>
    </Container>
  );
};

export default DevicesList;
