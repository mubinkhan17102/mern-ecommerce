const { newOrder } = require('../controllers/orderController')
const { isAuthinticated, authorizedUser } = require('../middleware/auth')

const router = require('express').Router()


router.route('order/new')
    .post(isAuthinticated, authorizedUser('user'), newOrder)