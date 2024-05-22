import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import RoomsPage from './pages/RoomsPage/RoomsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

import Layout from './components/Layout/Layout';

// contexts
import AuthContextProvider from './contexts/AuthContext';
import RoomsContextProvider from './contexts/RoomsContext';
import DeviceContextProvider from './contexts/DeviceContext';

function App() {
  return (
    <BrowserRouter>
      <DeviceContextProvider>
        <RoomsContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<Layout />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/rooms/:id" element={<RoomsPage />} />
              </Route>
            </Routes>
          </AuthContextProvider>
        </RoomsContextProvider>
      </DeviceContextProvider>
    </BrowserRouter>
  );
}

export default App;
