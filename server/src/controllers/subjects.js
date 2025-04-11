import Subject from '../models/Subject.js';

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.getAll();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterSubjects = async (req, res) => {
  try {
    const { id } = req.params;
    const subjects = await Subject.getAll();
    const subject = subjects.find(sub => sub.id === id);

    if (!subject) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Nombre y créditos son requeridos" });
    }

    const newSubject = await Subject.create(name);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID requerido" });
    }

    const deletedSubject = await Subject.delete(id);

    if (!deletedSubject) {
      return res.status(404).json({ error: "Asignatura no encontrada" });
    }

    res.status(200).json(deletedSubject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const editData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Validación básica
    if (!id || !data) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const updatedSubject = await Subject.updateData(id, data);
    res.status(200).json(updatedSubject);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};