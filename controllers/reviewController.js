const Review = require('../models/Review');
const reviewCodeWithClaude = require("../services/claudeService");
const reviewCodeWithGemini = require("../services/geminiService");
const crypto = require('crypto');

const formatReview = (review) => ({
  id: review._id,
  language: review.language,
  code: review.code,
  score: review.score,
  issues: review.issues,
  createdAt: review.createdAt
});

const createReview = async (req, res) => {
  try {
    const { language, code } = req.body;

   
    const codeHash = crypto.createHash('sha256').update(code).digest('hex');

    const cachedReview = await Review.findOne({ codeHash, language, user: req.userId });
    console.log("codeHash:", codeHash, "| Cache found:", !!cachedReview);

    if (cachedReview) {
      return res.status(200).json(formatReview(cachedReview));
    }

    const aiResult = await reviewCodeWithGemini(code, language);

    const newReview = new Review({
      language,
      code,
      score: aiResult.score,
      issues: aiResult.issues,
      user: req.userId,
      codeHash
    });

    await newReview.save();

    res.status(201).json(formatReview(newReview));

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const reviews = await Review.find({ user: req.userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalReviews = await Review.countDocuments({ user: req.userId });

    res.status(200).json({
      reviews: reviews.map(formatReview),
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to view this review" });
    }

    res.status(200).json(formatReview(review));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getReviews, getReviewById, deleteReview };