// En src/components/Layout.js
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const Layout = () => {
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = '/login'
  }
  return (
    <div>
      {/* Barra de navegación o header común */}
      <nav>...</nav>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      {/* Contenedor de las rutas hijas */}
      <Outlet />
    </div>
  );
};

export default Layout;