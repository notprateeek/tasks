import express from 'express'
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/task.js'

const router = express.Router()

router.get('/', getTasks)
router.post('/create', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
