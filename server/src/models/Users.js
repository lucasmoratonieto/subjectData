import pool from '../config/db.js';

const Users = {
  checkUser: async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows;
  },

  createUser: async (email, password_hash) => {
    const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [email, password_hash]);
    return result;
  }
};

export default Users;