const { getAllProducts, createProduct } = require('../controllers/productController')

const router = require('express').Router()

router.route('/products')
    .get(getAllProducts)

router.route('/products/new').post(createProduct)

module.exports = router;