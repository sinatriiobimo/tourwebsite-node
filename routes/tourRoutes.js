const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)

router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)

router
    .route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.postSingleTour)

router
    .route('/:id')
    .get(tourController.getSingleTour)
    .patch(tourController.patchSingleTour)
    .delete( 
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteSingleTour
    )

module.exports = router;