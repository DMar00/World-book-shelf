import { Int32 } from "mongodb"
import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    id_book:{ type: String, required: true, unique: true},
    title: { type: String, required: true },
    isbn: { type: String, unique: true, unique: true },
    authors: { type: String, required: true },
    publisher: { type: String, required: true },
    publish_date: { type: String },
    pages_number: { type: Int32, required: true},
    language:  { type: String, required: true },
    number_stars_1: { type: Int32},
    number_stars_2: { type: Int32},
    number_stars_3: { type: Int32},
    number_stars_4: { type: Int32},
    number_stars_5: { type: Int32},
    number_stars_total: { type: Int32},
    stars_score: { type: Int32},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }]
})


const bookModel = mongoose.models.book || mongoose.model("book", bookSchema);

export default bookModel;