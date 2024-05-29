const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const phoneListingController = require('../controller/userListingsManagementController');

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

router.put('/updatepwd', userController.updatePwd)

router.post('/verifyToken', userController.verifyToken);
router.get('/listings', phoneListingController.getUserListings);
router.post('/listings', phoneListingController.createListing);
router.delete('/listings/:id', phoneListingController.deleteListing);
router.put('/listings/:id', phoneListingController.updateListing);

router.get('/comments', userController.getUserComments);
router.put('/comments/visibility', userController.updateCommentVisibility);

module.exports = router;
