const router = require('express').Router();
const { create, getById } = require('../controllers/portfolio');

router.get('/:id', getById);
router.post('/', create);

module.exports = router;
