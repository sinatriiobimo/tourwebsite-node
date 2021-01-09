const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter)

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)

router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year').get(
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide', 'guide'), 
        tourController.getMonthlyPlan
    )

router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getToursWithin)
// /tours-within?disctace=233&center=-40,45&unit=mi
// /tour-distance/233/center/34.111745,-118.113491/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances)

router
    .route('/')
    .get(tourController.getAllTours)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.postSingleTour)

router
    .route('/:id')
    .get(tourController.getSingleTour)
    .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.patchSingleTour)
    .delete( 
        authController.protect, 
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteSingleTour
    )


    
module.exports = router;