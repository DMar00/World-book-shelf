import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
})


const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;