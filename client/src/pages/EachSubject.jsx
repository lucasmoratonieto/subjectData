import { data, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';

import axios from "axios";


function EachSubject() {

  const [subjectData, setSubjectData] = useState([])

  const [formData, setformData] = useState({
    ta: ''
  });
  const { id } = useParams()

  useEffect(() => {
    const loadData = async () => {
      try {

        const data = await axios.get(`http://localhost:5000/api/subjects/${id}`);
        setSubjectData(data.data)
        setformData({ ta: data.data.ta, wc: data.data.wc, temperatura: data.data.temperatura, medicacion: data.data.medicacion, evolutivo: data.data.evolutivo });


      } catch (err) {
        console.log('Error al cargar el paciente');
      }
    }
    loadData()
  }, [])
  const ta = useRef();



  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/subjects/editData/${id}`, formData)
      console.log(response)

      // toggleNewSubjectFunction()
      // onSubjectCreated();
    } catch (err) {
      console.error('error creating', err)
    }
  }



  const handleFormChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  console.log(formData)
  //-----------------------------------------
  return (
    <div>
      <h1>Paciente: {subjectData.name}</h1>
      <form onSubmit={editData}>
        <ul>
          <li>
            TA ➡️ <input type="text" name="ta" defaultValue={subjectData.ta} onChange={handleFormChange} />
          </li>
          <li>
            WC ➡️  <input type="text" name="wc" defaultValue={subjectData.wc} onChange={handleFormChange} />
          </li>
          <li>
            Temperatura ➡️  <input type="text" name="temperatura" defaultValue={subjectData.temperatura} onChange={handleFormChange} />
          </li>
          <li>
            Medicación ➡️  <input type="text" name="medicacion" defaultValue={subjectData.medicacion} onChange={handleFormChange} />
          </li>
          <li>
            Evolutivo ➡️  <input type="text" name="evolutivo" defaultValue={subjectData.evolutivo} onChange={handleFormChange} />
          </li>
        </ul>
        <button type="submit">Guarda</button>

      </form>
    </div>

  );
}

export default EachSubject;