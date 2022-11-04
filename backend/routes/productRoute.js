const { getAllProducts } = require('../controllers/productController')

const router = require('express').Router()

router.route('/products')
    .get(getAllProducts)

module.exports = router;