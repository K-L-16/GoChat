import Message from "../models/Message.js";
import User from "../models/User.js"
import cloudinary from "../lib/cloudinary.js";
import { io,userSocketMap } from "../server.js";

// get all users except the logged in user
export const getUsersForSidebar = async (req,res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

        //count number of messages not seen
        const unseenMessages = {}

        const promises = filteredUsers.map(async (user) => {
            //get all the unseenmessage
            const messages = await Message.find({ senderId: user._id, receiverId: userId, seen: false })
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length; // get the number of unread message from that user
            }
        })

        await Promise.all(promises);//waite for all the awiate function running
        res.json({ success: true, user: filteredUsers, unseenMessages})
    } catch(error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
    }
}

//get all messages for selected user 
export const getMessages = async (req, res)=>{
    try {
        const { id: selectedUserId } = req.params; // get the receiver id form the params
        const myId = req.user._id //get the me(senderId)

        //get all the message from me and receiver
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })

        //set the send message to the true
        await Message.updateMany({ senderId: selectedUserId, receiverId: myId }, {
            seen: true
        })

        res.json({success:true, messages})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//api to mark mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true }) // update the message to the true
        res.json({success: true})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//send message to selected user
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params.id;// the receiverid
        const senderId = req.user._id;//I amd the sender

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url// get the url of the image
        }

        const newMessage = Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        //send message
        //emit the new message to the receiver socket
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.json({success: true, newMessage})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}