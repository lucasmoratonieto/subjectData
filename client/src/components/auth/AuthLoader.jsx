// components/AuthLoader.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthLoader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ["/login"];
    if (publicPaths.includes(location.pathname)) return;

    const token = localStorage.getItem("jwtToken");

    // Verificar token con el backend
    const validateToken = async () => {
      try {
        await axios.get("http://localhost:5000/api/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        navigate("/login");
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      validateToken(); // Verificar validez en cada carga
    }
  }, [location.pathname]); // <-- Se ejecuta al cambiar de ruta

  return null;
};

export default AuthLoader;