const router = require('express').Router()
const { Spaces } = require('../db')

router.get('/', async (req, res, next) => {
  try {
    res.json(await Spaces.findAll())
  } catch (error) {
    next(error)
  }
})

module.exports = router
