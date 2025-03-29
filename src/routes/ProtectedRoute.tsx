import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> =
    ({ children }) => {
        const { user } = useContext(AuthContext);
        if (!user) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };