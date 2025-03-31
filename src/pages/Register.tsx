import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { FirebaseDatabaseService } from '../services/FirebaseDatabaseService';
import { Role } from '../services/IAuthService';

export const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();
    const userService = new FirebaseDatabaseService();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Por favor ingresa un correo electrónico válido');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            const userCredential = await authService.signUp(email, password);
            await userService.setUserRoles(userCredential.user.uid, {
                email: userCredential.user.email,
                roles: [Role.USER]
            });

            setSuccess('Registro exitoso. Redirigiendo al Dashboard...');
            setTimeout(() => navigate('/home'), 2000);
        } catch (error: any) {
            console.error("Error al registrarse:", error);
            setError(error.message || 'Ocurrió un error durante el registro');
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
                        Crear una cuenta
                    </h2>

                    <form onSubmit={handleRegister} className="space-y-4">
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
                                minLength={6}
                                required
                            />
                            <label className="label">
                                <span className="label-text-alt">Mínimo 6 caracteres</span>
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

                        {success && (
                            <div className="alert alert-success shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{success}</span>
                                </div>
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <span className="text-sm">¿Ya tienes una cuenta? </span>
                        <a
                            href="/login"
                            className="link link-primary text-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/login');
                            }}
                        >
                            Iniciar sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;