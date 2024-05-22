import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

import { ACTIONS } from '../helpers/consts';

const api = import.meta.env.VITE_API_URL;

export const roomsContext = createContext();
export const useRooms = () => useContext(roomsContext);

const INIT_STATE = {
  rooms: [],
  oneRoom: null,
  editedRoom: null,
  currentHouse: null,
  openEditModal: false,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_ROOMS:
      return { ...state, rooms: action.payload };
    case ACTIONS.GET_ONE_ROOM:
      return { ...state, oneRoom: action.payload };
    case ACTIONS.GET_CURRENT_HOUSE:
      return { ...state, currentHouse: action.payload };
    case ACTIONS.OPEN_EDIT_MODAL:
      return { ...state, openEditModal: action.payload };
    case ACTIONS.GET_EDITED_ROOM:
      return { ...state, editedRoom: action.payload };
    default:
      return state;
  }
};

const RoomsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    return {
      headers: { Authorization: `Bearer ${token?.data?.access_token}` },
    };
  };

  const getCurrentHouse = async () => {
    try {
      const config = getToken();
      const { data } = await axios(`${api}/house/`, config);
      dispatch({
        type: ACTIONS.GET_CURRENT_HOUSE,
        payload: data.data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRooms = async () => {
    try {
      const config = getToken();
      const { data } = await axios(`${api}/rooms/`, config);
      dispatch({
        type: ACTIONS.GET_ALL_ROOMS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addRoom = async (newRoom) => {
    const config = getToken();
    await axios.post(`${api}/rooms/create`, newRoom, config);
    getRooms();
  };

  const deleteRoom = async (id) => {
    const config = getToken();
    await axios.delete(`${api}/rooms/delete/${id}`, config);
    getRooms();
  };

  const getOneRoom = async (id) => {
    const config = getToken();
    const { data } = await axios(`${api}/rooms/${id}`, config);
    dispatch({
      type: ACTIONS.GET_ONE_ROOM,
      payload: data.data,
    });
  };

  const saveEditedRoom = async (newRoom) => {
    const config = getToken();
    await axios.put(`${api}/rooms/update/${newRoom.id}`, newRoom, config);
    getRooms();
  };

  const setIsModalOpen = (value) => {
    dispatch({
      type: ACTIONS.OPEN_EDIT_MODAL,
      payload: value,
    });
  };

  const getEditedRoom = (obj) => {
    dispatch({
      type: ACTIONS.GET_EDITED_ROOM,
      payload: obj,
    });
  };

  const values = {
    rooms: state.rooms.data,
    oneRoom: state.oneRoom,
    editedRoom: state.editedRoom,
    currentHouse: state.currentHouse,
    openEditModal: state.openEditModal,

    addRoom,
    getRooms,
    deleteRoom,
    getOneRoom,
    saveEditedRoom,
    getCurrentHouse,
    setIsModalOpen,
    getEditedRoom,
  };

  return (
    <roomsContext.Provider value={values}>{children}</roomsContext.Provider>
  );
};

export default RoomsContextProvider;
