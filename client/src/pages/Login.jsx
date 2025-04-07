import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('jwtToken', response.data.token);
      console.log(response.data.token)

      // Configura Axios para enviar el token en futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      navigate('/SubjectData');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
      console.error('Login error:', err);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Usuario</h3>
        <input type="text" name="email" id="email" onChange={handleChange} />
      </div>
      <div>
        <h3>Contraseña</h3>
        <input type="password" name="password" id="password" onChange={handleChange} />
      </div>
      <button type='submit'>Entrar</button>
    </form>

  );
};


export default Login;