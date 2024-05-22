import { useNavigate } from 'react-router-dom';
import { useRooms } from '../../contexts/RoomsContext';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

import { capitalizeFirstLetter } from '../../helpers';

const Rooms = ({ item }) => {
  const { deleteRoom, setIsModalOpen, getEditedRoom } = useRooms();

  const navigate = useNavigate();

  const showModal = (obj) => {
    setIsModalOpen(true);
    getEditedRoom(obj);
  };

  const handleEdit = (e, obj) => {
    e.stopPropagation();
    showModal(obj);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteRoom(id);
  };

  return (
    <Card
      style={{
        width: 300,
        textAlign: 'center',
        cursor: 'pointer',
        marginBottom: '20px',
      }}
      hoverable
      actions={[
        <EditOutlined key="edit" onClick={(e) => handleEdit(e, item)} />,
        <DeleteOutlined
          key="delete"
          onClick={(e) => handleDelete(e, item.id)}
        />,
      ]}
      onClick={() => navigate(`/rooms/${item.id}`)}
    >
      <Meta title={capitalizeFirstLetter(item.name)} description="" />
    </Card>
  );
};

export default Rooms;
