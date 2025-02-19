import express from 'express'
import { createQuestion, deleteQuestion, editQuestion, getAllQuestion } from '../controllers/questionController.js';


const router = express.Router();


router.post('/',createQuestion)
router.get('/',getAllQuestion)
router.put('/:questionId',editQuestion)
router.delete('/:questionId',deleteQuestion)

export default router;