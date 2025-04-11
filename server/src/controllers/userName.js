import Users from '../models/Users.js';


export const userName = async (req, res) => {
  try {
    const { email } = req.query;
    console.log('es el mail', email)

    // if (!email) {
    //   return res.status(400).json({ error: "Email es requerido" });
    // }

    const username = await Users.userName(email);
    console.log(username)
    res.status(200).json({ username });

  } catch (error) {
    if (error.message.includes('no encontrado')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({
      error: error.message || 'Error en el servidor'
    });
  }
};
