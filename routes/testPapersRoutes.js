import express from 'express'
import {createTest, editTest,getTest,getAllTest,deleteTest} from '../controllers/testPaperController.js'

const router = express.Router();

router.post('/',createTest)
router.put('/:testId',editTest)
router.get('/:testId',getTest)
router.get('/',getAllTest)
router.delete('/:testId',deleteTest)

export default router