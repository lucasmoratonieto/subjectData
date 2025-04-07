// En src/components/Layout.js
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Barra de navegación o header común */}
      <nav>...</nav>

      {/* Contenedor de las rutas hijas */}
      <Outlet />
    </div>
  );
};

export default Layout;