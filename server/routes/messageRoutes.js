import express from 'express'
import { protectRoute } from '../middleware/auth.js'
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js'

const messageRouter = express.Router()

//get the number of the unread message for the side bar
messageRouter.get("/users", protectRoute, getUsersForSidebar)
//get speicfic message for the user
messageRouter.get("/:id", protectRoute, getMessages)
//for each individial message
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen)
//send message
messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter
