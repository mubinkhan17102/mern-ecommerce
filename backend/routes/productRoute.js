const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require('../controllers/productController')
const { isAuthinticated, authorizedUser } = require('../middleware/auth')

const router = require('express').Router()

router.route('/products').get(getAllProducts)

router.route('/products/new').post( isAuthinticated ,createProduct)

router.route('/products/:id')
  .put(isAuthinticated, authorizedUser('admin') ,updateProduct)
  .delete(isAuthinticated , authorizedUser('admin') ,deleteProduct)
  .get(getProductDetails)

router.route('/product/review')
  .put(isAuthinticated, authorizedUser('admin'), createProductReview);

module.exports = router;