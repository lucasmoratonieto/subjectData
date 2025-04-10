import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchSubjects } from "../hooks/fetchSubjects";

function EachSubject() {
  const [subjectData, setSubjectData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const loadData = async () => {
      try {

        const data = await axios.get(`http://localhost:5000/api/subjects/${id}`);
        console.log(data.data.name)
        setSubjectData(data.data.name)
      } catch (err) {
        console.log('Error al cargar el paciente');
      }
    }
    loadData()
  }, [])


  return (
    <div>
      <h1>Paciente: {subjectData}</h1>


    </div>

  );
}

export default EachSubject;