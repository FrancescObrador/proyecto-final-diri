import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { FirebaseDatabaseService } from '../services/FirebaseDatabaseService';
import { Role } from '../services/IAuthService';
import { FormattedMessage, useIntl } from 'react-intl';
import Swal from 'sweetalert2';

export const Auth = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const userService = new FirebaseDatabaseService();
    
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showErrorAlert = (message: string) => {
        Swal.fire({
            icon: 'error',
            title: intl.formatMessage({ id: 'alert.error' }),
            text: message,
            confirmButtonColor: '#3B82F6',
        });
    };

    const showSuccessAlert = (message: string) => {
        Swal.fire({
            icon: 'success',
            title: intl.formatMessage({ id: 'alert.success' }),
            text: message,
            confirmButtonColor: '#3B82F6',
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            showErrorAlert(intl.formatMessage({ id: 'validation.emailInvalid' }));
            return;
        }

        try {
            if (activeTab === 'login') {
                await authService.signIn(email, password);
                navigate('/home');
            } else {
                if (password.length < 6) {
                    showErrorAlert(intl.formatMessage({ id: 'validation.passwordLength' }));
                    return;
                }
                
                const userCredential = await authService.signUp(email, password);
                await userService.setUserRoles(userCredential.user.uid, {
                    email: userCredential.user.email,
                    roles: [Role.USER]
                });
                
                showSuccessAlert(intl.formatMessage({ id: 'register.success' }));
                setTimeout(() => navigate('/home'), 2000);
            }
        } catch (error: any) {
            const errorMessage = error.message || intl.formatMessage({ 
                id: activeTab === 'login' 
                    ? 'validation.credentialsError' 
                    : 'register.error' 
            });
            showErrorAlert(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    {/* Tabs */}
                    <div className="tabs tabs-boxed w-full mb-4">
                        <button
                            className={`tab tab-lg flex-1 ${activeTab === 'login' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            <FormattedMessage id="login.title" />
                        </button>
                        <button
                            className={`tab tab-lg flex-1 ${activeTab === 'register' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('register')}
                        >
                            <FormattedMessage id="register.title" />
                        </button>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label justify-center">
                                <span className="label-text text-lg">
                                    <FormattedMessage id="login.email.label" />
                                </span>
                            </label>
                            <input
                                type="email"
                                placeholder={intl.formatMessage({ id: 'login.email.placeholder' })}
                                className="input input-bordered input-lg w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-control w-full">
                            <label className="label justify-center">
                                <span className="label-text text-lg">
                                    <FormattedMessage id="login.password.label" />
                                </span>
                            </label>
                            <input
                                type="password"
                                placeholder={intl.formatMessage({ id: 'login.password.placeholder' })}
                                className="input input-bordered input-lg w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={activeTab === 'register' ? 6 : undefined}
                            />
                            {activeTab === 'register' && (
                                <label className="label">
                                    <span className="label-text-alt">
                                        <FormattedMessage id="register.password.helper" />
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Botón de envío */}
                        <div className="form-control mt-6">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg w-full"
                            >
                                <FormattedMessage id={activeTab === 'login' ? 'login.submit' : 'register.submit'} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};