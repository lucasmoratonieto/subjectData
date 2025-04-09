import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/'); // Redirige a la página principal o muestra un mensaje
  }, []);

  return null; // Opcional: Mensaje de "Página no encontrada"
};

export default NotFound