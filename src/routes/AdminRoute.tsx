import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Role } from '../services/IAuthService';
import CenteredLoader from '../components/shared/CenteredLoader';

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, roles, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <CenteredLoader messages={['Loading user data...', 'Please wait...']} />
    );
  }

  const isAdmin = user && roles?.includes(Role.ADMIN);
  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
