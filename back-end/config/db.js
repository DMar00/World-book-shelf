import mongoose from "mongoose"

const project_name = "worldbookshelf_db";

const string = "mongodb://127.0.0.1:27017/" + project_name;


export const connectDB = async () => {
    try {
        await mongoose.connect(string);
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};


