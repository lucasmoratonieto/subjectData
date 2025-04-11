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
    const subject = subjects.find(sub => sub.id === id); // ¡Sin parseInt si usas UUID!

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
    const { name, credits } = req.body;

    if (!name || !credits) {
      return res.status(400).json({ error: "Nombre y créditos son requeridos" });
    }

    const newSubject = await Subject.create(name, credits);
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