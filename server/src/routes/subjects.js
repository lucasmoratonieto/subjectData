import { Router } from 'express';
import { getSubjects, createSubject, deleteSubject, filterSubjects, editData } from '../controllers/subjects.js';

const router = Router();

router.get('/', getSubjects);
router.get('/:id', filterSubjects);
router.post('/', createSubject);
router.delete('/:id', deleteSubject);

router.post('/editData/:id', editData);


export default router;