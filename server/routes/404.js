import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('404 Not Found')
})

export default router
