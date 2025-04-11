// En src/components/Layout.js
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';



const Hi = () => {
  const [userName, setuserName] = useState();
  const userEmail = localStorage.getItem('userEmail');

  const getName = async () => {

    try {
      const response = await axios.get('http://localhost:5000/api/userName',
        {
          params: {
            email: userEmail
          }
        }
      );

      setuserName(response.data.username.username)

    } catch (err) {
      console.error('Error fetching', err)
    }
  }
  useEffect(() => {
    if (userEmail) {
      getName();
    }
  }, [userEmail]);

  return (
    <div>
      <h1>Hola {userName} </h1>
    </div>
  );
};

export default Hi;