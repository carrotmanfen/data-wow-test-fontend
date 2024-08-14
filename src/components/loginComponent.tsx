import React, { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useLogin();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  
        console.log(username, password);
        if (username !== '' && password !== '') {
            const isLoginSuccess =  await login({username, password});
            if(isLoginSuccess){
                window.location.href = '/profile';
            }
        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-lg p-6 bg-white border rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center ">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium ">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full px-3 py-2 mt-1  border rounded-lg focus:outline-none focus:ring-hoverPrimary focus:border-hoverPrimary"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium ">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 mt-1  border rounded-lg focus:outline-none focus:ring-hoverPrimary focus:border-hoverPrimary"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2"
                    >
                        Login
                    </button>
                    <p className="mt-12 text-center">Don't have an account?</p>
                    <button
                        type="button"
                        onClick={() => window.location.href = '/register'}
                        className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2 mt-4"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;