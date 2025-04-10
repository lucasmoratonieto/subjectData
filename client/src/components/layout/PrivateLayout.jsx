// components/layout/PrivateLayout.js
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Hi from '../hi/Hi'


const PrivateLayout = () => {
  return (
    <div>
      <Header />
      <Hi />
    </div>
  );
};

export default PrivateLayout;