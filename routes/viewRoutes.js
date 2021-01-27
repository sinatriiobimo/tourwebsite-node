const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLogedIn, viewsController.getOverview)
router.get('/tour/:slug', authController.isLogedIn, viewsController.getTour)
router.get('/login', authController.isLogedIn, viewsController.getLoginForm)
router.get('/me', authController.protect, viewsController.getAccount)

router.post('/submit-user-data', authController.protect, viewsController.updateUserData)

module.exports = router;