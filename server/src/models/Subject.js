import pool from '../config/db.js';

const Subject = {
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM subjects');
    return rows;
  },

  create: async (name, credits) => {
    const { rows } = await pool.query(
      'INSERT INTO subjects (name, credits) VALUES ($1, $2) RETURNING *',
      [name, credits]
    );
    return rows[0];
  },

  delete: async (id) => {
    const { rows } = await pool.query(
      'DELETE FROM subjects WHERE id = $1;',
      [id]
    );
    return rows[0];
  }
};

export default Subject;