const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController')
const { isAuthinticated } = require('../middleware/auth')

const router = require('express').Router()

router.route('/products').get(getAllProducts)

router.route('/products/new').post( isAuthinticated ,createProduct)

router.route('/products/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)

module.exports = router;