// import sql from '../config/db.js';
// // import pool from '../config/db.js';

// const Users = {
//   checkUser: async (email) => {
//     const { rows } = await sql.query('SELECT * FROM users WHERE email = $1', [email]);
//     return rows;
//   },

//   // createUser: async (email, password_hash) => {
//   //   const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';
//   //   const result = await sql.query(query, [email, password_hash]);
//   //   return result;
//   // },

//   createUser: async (email, password_hash) => {
//     try {
//       const [user] = await sql`
//         INSERT INTO users (email, password_hash)
//         VALUES (${email}, ${password_hash})
//         RETURNING *
//       `
//       return user
//     } catch (error) {
//       // Manejo de errores único de email
//       if (error.code === '23505') {
//         throw new Error('El email ya está registrado')
//       }
//       throw error
//     }
//   },

//   userName: async (email) => {
//     const { rows } = await pool.query('SELECT username FROM users WHERE email = $1', [email]);
//     return rows;
//   },
// };

// export default Users;


import sql from '../config/db.js';

const Users = {
  checkUser: async (email) => {
    try {
      const users = await sql`
        SELECT * FROM users 
        WHERE email = ${email}
      `;
      return users;
    } catch (error) {
      throw new Error(`Error al buscar usuario: ${error.message}`);
    }
  },

  createUser: async (email, password_hash) => {
    try {
      const [user] = await sql`
        INSERT INTO users (email, password_hash)
        VALUES (${email}, ${password_hash})
        RETURNING *
      `;
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('El email ya está registrado');
      }
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  },

  userName: async (email) => {
    try {
      const [user] = await sql`
        SELECT username FROM users 
        WHERE email = ${email}
      `;
      return user;
    } catch (error) {
      throw new Error(`Error al obtener username: ${error.message}`);
    }
  }
};

export default Users;