const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, productReviews, deleteReview } = require('../controllers/productController')
const { isAuthinticated, authorizedUser } = require('../middleware/auth')

const router = require('express').Router()

router.route('/products').get(getAllProducts)

router.route('/products/new').post( isAuthinticated ,createProduct)

router.route('/products/:id')
  .put(isAuthinticated, authorizedUser('admin') ,updateProduct)
  .delete(isAuthinticated , authorizedUser('admin') ,deleteProduct)
  .get(getProductDetails)

router.route('/product/review')
  .put(isAuthinticated, createProductReview)

router.route('/product/:id/reviews')
.get(isAuthinticated, productReviews)
.delete(isAuthinticated, deleteReview);

module.exports = router;