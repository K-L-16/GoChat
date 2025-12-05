import mongoose, { modelNames } from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    fullName: { type: String, require: true },
    password: { type: String, require: true, unique: true, minlength: 6 },
    profilePic: { type: String, default: "" }, //store the url for the pic
    bio: { type: String }, 
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema) //create the model

export default User