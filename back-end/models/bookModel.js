import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    id_book:{ type: String, required: true, unique: true},
    title: { type: String, required: true },
    authors: { type: String, required: true },
    cover : {type: String},
    genres: [{ type: String }],  // Array di stringhe per i generi
    description: { type:String , required: true },
    publisher: { type: String}, 
    publish_year: { type: String, required: true }, 
    pages_number: { type: Number, required: true, default: 0 }, 
    language:  { type: String }, 
    number_stars_1: { type: Number, default: 0 }, 
    number_stars_2: { type: Number, default: 0 }, 
    number_stars_3: { type: Number, default: 0 }, 
    number_stars_4: { type: Number, default: 0 }, 
    number_stars_5: { type: Number, default: 0 },  
})

const bookModel = mongoose.models.book || mongoose.model("book", bookSchema);

export default bookModel;