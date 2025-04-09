import Users from '../models/Users.js';


export const userName = async (req, res) => {
  try {
    const { email } = req.query
    console.log(email)
    const subjects = await Users.userName(email);
    res.status(200).json(subjects);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
