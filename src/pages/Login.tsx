import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';

export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        
        if (!validateEmail(email)) {
            setError('Por favor ingresa un correo electrónico válido');
            return;
        }

        try {
            const userCredential = await authService.signIn(email, password);
            console.log("Usuario autenticado:", userCredential.user);
            navigate('/home');
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            setError(error.message || 'Credenciales incorrectas o error del servidor');
        }
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-4 justify-center">
                        Iniciar Sesión
                    </h2>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Correo electrónico</span>
                            </label>
                            <input
                                type="email"
                                placeholder="ejemplo@dominio.com"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contraseña</span>
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="label">
                                <a 
                                    href="/forgot-password" 
                                    className="label-text-alt link link-hover"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/forgot-password');
                                    }}
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </label>
                        </div>
                        
                        {error && (
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}
                        
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                Ingresar
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center mt-4">
                        <span className="text-sm">¿No tienes una cuenta? </span>
                        <a 
                            href="/register" 
                            className="link link-primary text-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/register');
                            }}
                        >
                            Regístrate aquí
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};