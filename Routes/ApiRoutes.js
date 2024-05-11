const express = require('express')
const router = express.Router()
const ApiControls = require('../Controller/ApiControls')

router.post('/', ApiControls.addImage)
router.get('/', ApiControls.getAllPhoto)

router.get('/test', ApiControls.test)

module.exports = router