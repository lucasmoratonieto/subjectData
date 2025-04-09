import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllSubjectData from './pages/AllSubjectData'
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './privateRoute/PirivateRoute';
import AuthLoader from './components/auth/AuthLoader';
import NotFound from './pages/NotFound';
import Header from './components/header/Header'
import Hi from './components/hi/Hi';




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Hi />
      <AuthLoader />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/SubjectData' element={<AllSubjectData />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;