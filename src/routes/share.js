const router = require('express').Router();
const { getAll, getById, create, update, buyShare, sellShare } = require('../controllers/share');
const { validate } = require('../middlewares/validate')
const { createSchema, updateSchema, buySchema, sellSchema } = require("../validations/share");

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', validate(createSchema), create);
router.put('/:id', validate(updateSchema), update);
router.post('/buy', validate(buySchema), buyShare);
router.post('/sell', validate(sellSchema), sellShare);

module.exports = router;
