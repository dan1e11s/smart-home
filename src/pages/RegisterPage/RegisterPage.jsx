import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { Button, Form, Input } from 'antd';

import Container from '../../components/Container/Container';

const RegisterPage = () => {
  const { register } = useAuth();

  const onFinish = (values) => {
    register(values);
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Form
        name="register"
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
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
          <p>
            or{' '}
            <span
              onClick={() => navigate('/')}
              style={{ color: '#3d8cf2', cursor: 'pointer' }}
            >
              login now!
            </span>
          </p>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default RegisterPage;
