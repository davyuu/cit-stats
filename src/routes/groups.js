import express from 'express'

const router = express.Router()

router.post('/update', async (_, res) => {
  res.json({ status: 200 })
})

export default router