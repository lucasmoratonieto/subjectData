import axios from 'axios';

let setSubjectData = '';


export async function fetchSubjects() {
  try {
    const response = await axios.get('http://localhost:5000/api/subjects');
    return response.data
  } catch (err) {
    console.error('Error fetching', err)
  }
}