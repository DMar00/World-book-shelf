import mongoose from "mongoose"

const project_name = "worldbookshelf_db";
const password = "2GQbVFBxApNTIrD9";
const user = "admin";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://"+user+":"+password+"@cluster0.5k22rss.mongodb.net/"+project_name).then(
        ()=>console.log("DB connected")
    )
}
