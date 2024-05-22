import { useState } from 'react';

import { Button, Card, Form, Input, Modal } from 'antd';
import { useRooms } from '../../contexts/RoomsContext';
const { Meta } = Card;

const NewRoom = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentHouse, addRoom } = useRooms();

  const onFinish = (values) => {
    setIsModalOpen(false);

    addRoom({
      house_id: currentHouse?.id,
      name: values.room_name,
    });

    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        onClick={showModal}
        hoverable
        style={{
          width: 300,
          height: 145,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Meta title="Add new room" description="" />
      </Card>
      <Modal
        style={{
          textAlign: 'center',
        }}
        title="New Room"
        open={isModalOpen}
        onOk={onFinish}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Room name"
            name="room_name"
            rules={[
              {
                required: true,
                message: 'Please input room name!',
              },
            ]}
          >
            <Input />
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
    </>
  );
};

export default NewRoom;
