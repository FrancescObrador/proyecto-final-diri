import React, {
    createContext, useEffect, useState,
    ReactNode
} from 'react';
import { authService } from '../services/AuthService';
import { Role } from '../services/IAuthService';
interface AuthContextProps {
    user: any | null;
    roles: Role[] | null;
    loading?: boolean;
}
export const AuthContext =
    createContext<AuthContextProps>({
        user: null,
        roles: null
    });

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [roles, setRoles] = useState<Role[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const userRoles = await authService.getUserRoles(currentUser);
                    setRoles(userRoles);
                    setLoading(false);
                } catch (error) {
                    console.error('Error al obtener los roles:', error);
                    setRoles(null);
                    setLoading(false);
                }
            }
            else {
                setRoles(null);
            }
        });
        return unsubscribe;
    }, []);
    return (
        <AuthContext.Provider value={{ user, roles, loading }}>
            {children}
        </AuthContext.Provider>
    );
};