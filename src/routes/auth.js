const router = require('express').Router();
const { register, login, me } = require("../controllers/auth");
const verifyAccessToken = require('../middlewares/auth');
const { validate } = require('../middlewares/validate')
const { registerSchema, loginSchema } = require("../validations/auth");


router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/me', verifyAccessToken, me)


module.exports = router;