import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function NewSubjectForm({ onSubjectCreated }) {
  const [toggleNewSubject, hanldeToggleNewSubject] = useState(false)

  const [formData, setformData] = useState({
    name: ''
  });
  const name = useRef();

  const toggleNewSubjectFunction = () => {
    hanldeToggleNewSubject(!toggleNewSubject);
  }
  const createSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/subjects', formData)
      console.log(response.data)
      setformData({ name: '' });
      name.current.value = '';

      toggleNewSubjectFunction()
      onSubjectCreated();
    } catch (err) {
      console.error('error creating', err)
    }
  }
  const handleFormChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  if (toggleNewSubject) {
    return (
      <>
        <button onClick={toggleNewSubjectFunction}>Nuevo Paciente</button>
        <form onSubmit={createSubject} >
          <div>
            <h3>Name</h3>
            <input type="text" name="name" id="" onChange={handleFormChange} ref={name} />
          </div>
          <button type='submit'>Crear</button>
        </form>
      </>
    );
  } else {
    return (
      <button onClick={toggleNewSubjectFunction}>Nuevo Paciente</button>
    );
  }
}

export default NewSubjectForm;