import { useRooms } from '../../contexts/RoomsContext';

import { Button, Form, Input, Modal } from 'antd';

const EditRoom = () => {
  const [form] = Form.useForm();
  const { openEditModal, setIsModalOpen, editedRoom, saveEditedRoom } =
    useRooms();

  const handleOk = (values) => {
    let newObj = {
      ...editedRoom,
      name: values.new_room_name,
    };
    saveEditedRoom(newObj);
    setIsModalOpen(false);

    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      style={{
        textAlign: 'center',
      }}
      title="Edit Room"
      open={openEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        name="edit room"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleOk}
        autoComplete="off"
      >
        <Form.Item
          label="Room name"
          name="new_room_name"
          rules={[
            {
              required: true,
              message: 'Please input new room name!',
            },
          ]}
        >
          <Input placeholder={editedRoom?.name} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRoom;
