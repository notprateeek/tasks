import express from 'express'
// eslint-disable-next-line object-curly-newline
import { signedIn, signout, signup, signin } from '../controllers/auth.js'

const router = express.Router()

router.get('/', signedIn)
router.get('/signout', signout)
router.post('/signup', signup)
router.post('/signin', signin)

export default router
