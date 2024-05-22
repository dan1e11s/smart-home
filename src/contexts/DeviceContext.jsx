import { createContext, useContext, useReducer } from 'react';
import { ACTIONS } from '../helpers/consts';
import axios from 'axios';

const deviceContext = createContext();
export const useDevice = () => useContext(deviceContext);

const api = import.meta.env.VITE_API_URL;

const INIT_STATE = {
  devices: [],
  oneDevice: null,
  isOpenModal: false,
  deviceValue: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_DEVICES:
      return { ...state, devices: action.payload };
    case ACTIONS.GET_ONE_DEVICE:
      return { ...state, oneDevice: action.payload };
    case ACTIONS.OPEN_DEVICE_MODAL:
      return { ...state, isOpenModal: action.payload };
    case ACTIONS.GET_DB:
      return {
        ...state,
        deviceValue: {
          ...state.deviceValue,
          [action.payload.name]: {
            value: action.payload.value,
            isOff: action.payload.isOff,
          },
        },
      };
    default:
      return state;
  }
};

const DeviceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    return {
      headers: { Authorization: `Bearer ${token?.data?.access_token}` },
    };
  };

  const getDevices = async () => {
    try {
      const config = getToken();
      const { data } = await axios(`${api}/device/`, config);
      dispatch({
        type: ACTIONS.GET_ALL_DEVICES,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOneDevice = async (id) => {
    try {
      const config = getToken();
      const { data } = await axios(`${api}/device/${id}`, config);
      dispatch({
        type: ACTIONS.GET_ONE_DEVICE,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const attachDevice = async (obj, id) => {
    try {
      const config = getToken();
      await axios.put(`${api}/device/attachDevice/${id}`, obj, config);
      getDevices();
    } catch (error) {
      console.log(error);
    }
  };

  const detachDevice = async (id) => {
    try {
      const config = getToken();
      await axios.put(`${api}/device/detachDevice/${id}`, {}, config);
      getDevices();
    } catch (error) {
      console.log(error);
    }
  };

  const setOpenDeviceModal = (value) => {
    dispatch({
      type: ACTIONS.OPEN_DEVICE_MODAL,
      payload: value,
    });
  };

  const values = {
    devices: state.devices,
    oneDevice: state.oneDevice,
    isOpenModal: state.isOpenModal,
    deviceValue: state.deviceValue,

    getDevices,
    attachDevice,
    detachDevice,
    getOneDevice,
    setOpenDeviceModal,
    dispatch,
  };

  return (
    <deviceContext.Provider value={values}>{children}</deviceContext.Provider>
  );
};

export default DeviceContextProvider;
