import mongoose from "mongoose";

//function to connect to the mongodb database
export const connectDB = async() => {
    try {
        //show connected infomation
        mongoose.connection.on('connected', () => console.log('database connected'))
        //connect to database
        await mongoose.connect(`${process.env.MONGODB_URL}/chat-app`)
    } catch(error) {
        console.log(error)
    }
}