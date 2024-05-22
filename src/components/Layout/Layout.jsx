import Container from '../Container/Container';
import Profile from '../Profile/Profile';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container>
      <Profile />
      <Outlet />
    </Container>
  );
};

export default Layout;
