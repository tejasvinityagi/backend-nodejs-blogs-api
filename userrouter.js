const express = require("express");
const router = express.Router();
const getAlluser = require('./usercontroller')
const createUser = require('./usercontroller')
const login = require('./usercontroller')

router.get('/',getAlluser)
router.post('/signup',createUser)
router.post('/login', login)

module.exports = router