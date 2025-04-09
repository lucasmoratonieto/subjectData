import bcrypt from 'bcrypt'
import Users from '../models/Users.js';
import { generateToken } from '../utils/jwt.js';

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generar hash de la contraseña
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Guardar en DB
    const newUser = await Users.createUser(email, password_hash);

    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const checkEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    // // 1. Verificar si el usuario existe
    const userDB = await Users.checkUser(email);




    // Ver por que me esta dando problemas.
    if (userDB.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }


    // 2. Obtener el hash de la base de datos
    const user = userDB[0]; // Acceso correcto a la fila

    const validPassword = await bcrypt.compare(password, user.password_hash); // Usar el nombre correcto de la columna

    // 3. Validar contraseña
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 4. Si todo es correcto, generar token JWT
    const token = generateToken(user.id); // Tu función para generar JWT
    const username = user.username;
    res.status(200).json({ token, username });

  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};