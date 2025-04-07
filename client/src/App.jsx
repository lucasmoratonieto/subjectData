import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllSubjectData from './pages/AllSubjectData'
import Home from './pages/Home';
import Login from './pages/Login';




function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/SubjectData' element={<AllSubjectData />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;