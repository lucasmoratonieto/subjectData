import sql from '../config/db.js';

const Subject = {
  getAll: async () => {
    try {
      const subjects = await sql`SELECT * FROM subjects`;
      return subjects;
    } catch (error) {
      throw new Error(`Error al obtener asignaturas: ${error.message}`);
    }
  },

  create: async (name, credits) => {
    try {
      const [newSubject] = await sql`
        INSERT INTO subjects (name, credits)
        VALUES (${name}, ${credits})
        RETURNING *
      `;
      return newSubject;
    } catch (error) {
      throw new Error(`Error al crear asignatura: ${error.message}`);
    }
  },

  delete: async (id) => {
    try {
      const [deletedSubject] = await sql`
        DELETE FROM subjects 
        WHERE id = ${id}
        RETURNING *
      `;
      return deletedSubject;
    } catch (error) {
      throw new Error(`Error al eliminar asignatura: ${error.message}`);
    }
  }
};

export default Subject;