import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDevice } from '../../contexts/DeviceContext';

import * as Icons from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';
import { Progress, Slider } from 'antd';

import config from './config';
import { ACTIONS } from '../../helpers/consts';

const DynamicIcon = ({ type }) => {
  const IconComponent = Icons[type];
  return IconComponent ? <IconComponent /> : null;
};

const DeviceModal = ({ power, setPower, progress, setProgress }) => {
  const [objConfig, setObjConfig] = useState(null);

  const { isOpenModal, oneDevice, setOpenDeviceModal, dispatch, deviceValue } =
    useDevice();

  useEffect(() => {
    setObjConfig(config[oneDevice?.name]);
  }, [oneDevice?.name]);

  const handleOk = () => {
    setOpenDeviceModal(false);
  };
  const handleCancel = () => {
    setOpenDeviceModal(false);
  };

  const handleSliderChange = (value) => {
    dispatch({
      type: ACTIONS.GET_DB,
      payload: {
        name: oneDevice.name,
        value: progress,
        isOff: power,
      },
    });
    setProgress(value);
  };

  return (
    <Modal
      title={
        <>
          <DynamicIcon type={objConfig?.icon} /> {oneDevice?.name}
        </>
      }
      open={isOpenModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {objConfig?.isProgress && (
        <div style={{ width: '300px', margin: '0 auto', textAlign: 'center' }}>
          <Progress percent={deviceValue[oneDevice.name]?.value} />
          <Slider
            min={0}
            max={100}
            value={deviceValue[oneDevice.name]?.value}
            onChange={handleSliderChange}
            style={{ marginTop: '20px' }}
          />
        </div>
      )}

      <div style={{ textAlign: 'right' }}>
        <Button
          type={power ? 'default' : 'primary'}
          onClick={() => setPower(!power)}
        >
          <PoweroffOutlined />
        </Button>
      </div>
    </Modal>
  );
};

export default DeviceModal;
