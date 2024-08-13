import Register from "@/components/loginComponent";
import React, { useState } from 'react';
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { register } = useRegister();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  
        console.log(username, password, name);
        if (username !== '' && password !== '' && name !== '') {
            const isRegisterSuccess =  await register({username, password, name});
            if(isRegisterSuccess){
                alert('register successful!');  
                window.location.href = '/login';
            }
        }
    }

  return (
    <main
      className={`flex h-screen w-screen items-center justify-center`}
    >
        <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-lg p-6 bg-white border rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center ">Register</h2>
                <form onSubmit={handleSubmit} className="mb-6">
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
                    <div className="mb-6">
                        <label className="block text-sm font-medium ">Display Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="w-full px-3 py-2 mt-1  border rounded-lg focus:outline-none focus:ring-hoverPrimary focus:border-hoverPrimary"
                            required
                        />
                    </div>
                    <div className="mb-6">

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>
                </form>
                    
            </div>
        </div>
    </main>
  );
}