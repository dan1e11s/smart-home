import { useEffect } from 'react';
import { useRooms } from '../../contexts/RoomsContext';

import Container from '../Container/Container';
import Rooms from '../Rooms/Rooms';
import NewRoom from '../NewRoom/NewRoom';

import style from './index.module.css';
import EditRoom from '../EditRoom/EditRoom';

const RoomsList = () => {
  const { rooms, getRooms, getCurrentHouse } = useRooms();

  useEffect(() => {
    getRooms();
    getCurrentHouse();
  }, []);

  return (
    <Container>
      <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>My rooms</h3>
      <div className={style.list}>
        {rooms && rooms.map((item) => <Rooms item={item} key={item?.id} />)}
        <NewRoom />
        <EditRoom />
      </div>
    </Container>
  );
};

export default RoomsList;
