import express from 'express'
import notFound from './404.js'
import authRoutes from './auth.js'
import taskRoutes from './tasks.js'
import checkAuth from '../utils/checkAuth.js'

const router = express.Router()

router.use('/404', notFound)
router.use('/auth', authRoutes)
router.use('/tasks', checkAuth, taskRoutes)

export default router
