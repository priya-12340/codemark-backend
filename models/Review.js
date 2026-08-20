const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    language:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    score:{
        type: Number
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    issues: [
        {
            severity: String,
            description: String,
            suggestedFix: String
        }
        ]
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;