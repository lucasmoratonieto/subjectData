// import bcrypt from 'bcrypt'
// import Users from '../models/Users.js';
// import { generateToken } from '../utils/jwt.js';

// // export const createUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Generar hash de la contraseña
// //     const saltRounds = 10;
// //     const password_hash = await bcrypt.hash(password, saltRounds);

// //     // Guardar en DB
// //     const newUser = await Users.createUser(email, password_hash);

// //     res.json(newUser.rows[0]);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// export const createUser = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const password_hash = await bcrypt.hash(password, 10)

//     const newUser = await Users.createUser(email, password_hash)
//     console.log(newUser)
//     res.status(201).json(newUser)

//   } catch (error) {
//     res.status(400).json({
//       error: error.message.includes('único')
//         ? 'El email ya existe'
//         : 'Error al registrar usuario'
//     })
//   }
// }


// export const checkEmail = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // // 1. Verificar si el usuario existe
//     const userDB = await Users.checkUser(email);




//     // Ver por que me esta dando problemas.
//     if (userDB.length === 0) {
//       return res.status(401).json({ error: 'Credenciales inválidas' });
//     }


//     // 2. Obtener el hash de la base de datos
//     const user = userDB[0]; // Acceso correcto a la fila

//     const validPassword = await bcrypt.compare(password, user.password_hash); // Usar el nombre correcto de la columna

//     // 3. Validar contraseña
//     if (!validPassword) {
//       return res.status(401).json({ error: 'Credenciales inválidas' });
//     }

//     // 4. Si todo es correcto, generar token JWT
//     const token = generateToken(user.id); // Tu función para generar JWT
//     const username = user.username;
//     res.status(200).json({ token, username });

//   } catch (error) {
//     res.status(500).json({ error: 'Error en el servidor' });
//   }
// };



import bcrypt from 'bcrypt';
import Users from '../models/Users.js';
import { generateToken } from '../utils/jwt.js';

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await Users.createUser(email, password_hash);

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      created_at: newUser.created_at
    });

  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(400).json({
      error: error.message.includes('ya está registrado')
        ? error.message
        : 'Error al registrar usuario'
    });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const userDB = await Users.checkUser(email);

    if (userDB.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = userDB[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user.id);
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error en checkEmail:", error);
    res.status(500).json({
      error: error.message || 'Error en el servidor'
    });
  }
};