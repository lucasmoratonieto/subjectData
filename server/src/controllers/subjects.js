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
  const { id } = req.params
  const subjects = await Subject.getAll();
  const subject = subjects.find(sub => sub.id === parseInt(id))

  if (!subject) {
    return res.status(404).json('not found')
  }
  res.json(subject)
}

export const createSubject = async (req, res) => {
  try {
    const { name, credits } = req.body;
    const newSubject = await Subject.create(name, credits);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const deleteSubject = await Subject.delete(id);
    res.status(201).json(deleteSubject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};