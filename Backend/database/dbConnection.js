import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Your database connected successfully");
    })
    .catch((err) =>{
        console.log("Error occured while connecting to database: ", err);
    })
}

export default dbConnection;