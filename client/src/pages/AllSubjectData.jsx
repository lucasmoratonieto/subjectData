import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewSubjectForm from '../components/forms/newSubjectForm/NewSubjectForm';
import { fetchSubjects } from '../hooks/fetchSubjects';

function AllSubjectData() {
  const [subjectData, setSubjectData] = useState([]);

  const loadData = async () => {
    const data = await fetchSubjects();
    setSubjectData(data)
  }
  useEffect(() => {
    loadData()
  }, []);

  const handleDelete = async (id) => {
    alert('Seguro que quieres eliminar al paciente?')
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`)
      loadData()
    } catch (err) {
      console.error('error deleting', err)
    }
  }


  return (
    <div>
      <h1>Mis Pacientes</h1>

      <ul>
        {subjectData.map(subject => (
          <li key={subject.id}>
            <Link to={`/SubjectData/${subject.id}`}>{subject.name}</Link>
            <button onClick={() => handleDelete(subject.id)}>X</button>
          </li>
        ))}
      </ul>
      <NewSubjectForm onSubjectCreated={loadData} />
    </div>

  );
}

export default AllSubjectData;