import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}login`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ThisIsTheComplexCode@123#123',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      // Store the token in localStorage
      window.localStorage.setItem('token', result.access_token);
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-40 px-6">
      <h2 className="text-4xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-md font-semibold">Username</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-black"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-md font-semibold">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded text-black"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-[#0c1b2b] p-3 rounded hover:bg-white hover:text-[#0c1b2b] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;