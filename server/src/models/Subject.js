import sql from '../config/db.js';
import { editData } from '../controllers/subjects.js';

const Subject = {
  getAll: async () => {
    try {
      const subjects = await sql`SELECT * FROM subjects`;
      return subjects;
    } catch (error) {
      throw new Error(`Error al obtener asignaturas: ${error.message}`);
    }
  },

  create: async (name) => {
    try {
      const [newSubject] = await sql`
        INSERT INTO subjects (name)
        VALUES (${name})
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
  },


  updateData: async (id, data) => {
    try {
      const [updated] = await sql`
        UPDATE subjects SET
          ta = ${data.ta},
          wc = ${data.wc},
          temperatura = ${data.temperatura},
          medicacion = ${data.medicacion},
          evolutivo = ${data.evolutivo}
        WHERE id = ${id}
        RETURNING *
      `;

      if (!updated) throw new Error('Registro no encontrado');
      return updated;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error.message}`);
    }
  }
};

export default Subject;