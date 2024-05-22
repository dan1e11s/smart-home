import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDevice } from '../../contexts/DeviceContext';
import { useRooms } from '../../contexts/RoomsContext';

import { Card, Switch, Tooltip } from 'antd';
import DeviceModal from '../DeviceModal/DeviceModal';

const Device = ({ item }) => {
  const [power, setPower] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    attachDevice,
    detachDevice,
    getOneDevice,
    setOpenDeviceModal,
    isOpenModal,
  } = useDevice();
  const { currentHouse } = useRooms();

  const { id } = useParams();

  const onChange = (checked, e) => {
    e.stopPropagation();
    if (checked) {
      let obj = {
        house_id: currentHouse.id,
        room_id: id,
        room_name: item.name,
      };
      attachDevice(obj, item.id);
    } else {
      detachDevice(item.id);
    }
  };

  return (
    <>
      <Card
        hoverable
        title={item.name}
        extra={
          <Tooltip title={item.room_id && item.house_id ? 'Detach' : 'Attach'}>
            <Switch
              checked={item.room_id && item.house_id && item.room_id == id}
              onChange={(checked, e) => onChange(checked, e)}
            />
          </Tooltip>
        }
        style={{
          width: 300,
          marginBottom: '20px',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (item.room_id && item.house_id) {
            getOneDevice(item.id);
            setOpenDeviceModal(true);
          }
        }}
      ></Card>
      {isOpenModal && (
        <DeviceModal
          power={power}
          setPower={setPower}
          progress={progress}
          setProgress={setProgress}
        />
      )}
    </>
  );
};

export default Device;
