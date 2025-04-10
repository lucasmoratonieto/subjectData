import { Navigate, Outlet } from "react-router-dom";
import Hi from "../components/hi/Hi";
import Header from '../components/header/Header'

const PrivateRoute = () => {
  const token = localStorage.getItem("jwtToken");

  return token ? (
    <>
      <Hi />
      <Header />
      {/* <Outlet /> */}
    </>

  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;