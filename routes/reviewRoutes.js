const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createReview, getReviews, getReviewById, deleteReview } = require('../controllers/reviewController');

router.post('/', authMiddleware, createReview);
router.get('/', authMiddleware, getReviews);
router.get('/:id', authMiddleware, getReviewById);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;