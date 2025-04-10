import React, { useEffect, useRef, useState } from 'react';
import { fetchSubjects } from './hooks/fetchSubjects';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllSubjectData from './pages/AllSubjectData'
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './privateRoute/PirivateRoute';
import AuthLoader from './components/auth/AuthLoader';
import NotFound from './pages/NotFound';
import EachSubject from './pages/EachSubject';




function App() {
  const [subjectData, setSubjectData] = useState([]);

  const loadData = async () => {
    const data = await fetchSubjects();
    setSubjectData(data)

  }
  useEffect(() => {
    loadData()
  }, []);
  return (
    <BrowserRouter>
      <AuthLoader />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida con layout integrado */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/SubjectData" element={<AllSubjectData />} />
          <Route path="/SubjectData/:id" element={<EachSubject />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;