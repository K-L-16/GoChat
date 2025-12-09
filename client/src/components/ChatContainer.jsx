import personIcon from '../assets/person.png'
import arrowIcon from '../assets/arrow.png'
import helpIcon from '../assets/info.png'
import galleryIcon from '../assets/images.png'
import logo from '../assets/message-square-quote.png'
import sendIcon from '../assets/send.png'
import { useContext, useEffect, useRef, useState } from 'react'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'




export default function ChatContainer() {

    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    
    const { authUser, onlineUsers } = useContext(AuthContext)

    const [input, setInput] = useState('')
    
    const scrollEnd = useRef()
    
    //handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault;
        if (input.trim() === "") return null // if nothing
        await sendMessage({ text: input.trim() })
        setInput("")
    }

    //handle sending an image
    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) {
            toast.error("select an image file")
            return
        }
        const reader = new FileReader()
        reader.onloadend = async () => {
            await sendMessage({ image: reader.result })
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }


    //get the messages
    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id)
        }
    }, [selectedUser])

    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behavior: 'smooth', block: 'end', })
        }
    }, [messages])


    return selectedUser ? (
        
        <div className="h-full bg-white relative overflow-scroll flex flex-col">
            {/* //{Headers} */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-white">
                <img
                    src={selectedUser?.profilePic || personIcon}
                    alt={selectedUser?.fullName || 'user'}
                    className="w-8 h-8 rounded-full object-cover"
                />
                <p className="flex-1 text-base font-medium text-slate-900 flex items-center gap-2">
                    {selectedUser.fullName}
                    {onlineUsers.includes(selectedUser._id) && (
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                </p>
                <img src={arrowIcon} alt="" className='md:hidden w-6 cursor-pointer filter brightness-0' onClick={()=>setSelectedUser(null)}/>
                <img src={helpIcon} alt="" className='max-md:hidden w-4 h-4 opacity-60 filter brightness-0' />

            </div>
            {/* //chat area  */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
                        {msg.image ? (
                            <img
                                src={msg.image}
                                alt=""
                                className="max-w-[260px] rounded-2xl overflow-hidden mb-1 border border-gray-200"
                            />
                        ) : (
                            <p
                                className={`px-3 py-2 max-w-[260px] text-sm rounded-2xl mb-1 break-words
      ${msg.senderId === authUser._id
                                        ? 'bg-violet-500 text-white rounded-br-sm'
                                        : 'bg-gray-100 text-slate-900 rounded-bl-sm'
                                    }`}
                            >
                                {msg.text}
                            </p>
                        )}

                        <div className='text-center text-xs'>
                            <img src={msg.senderId === authUser._id ? authUser?.profilePic || personIcon : selectedUser?.profilePic || personIcon} alt="" className='w-7 h-7 rounded-full object-cover' />
                            <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
                        </div>

                    </div>
                ))}
                
                <div ref={scrollEnd}></div>

            </div>
            {/* text area  */}
            <div className="  sticky bottom-0  left-0 right-0 px-4 py-3 border-t border-gray-100 bg-[#fafafa]">
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                    <label htmlFor="image" className="cursor-pointer">
                        <img src={galleryIcon} alt="" className="w-5 opacity-70 filter brightness-0" />
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/png, image/jpeg"
                        hidden
                        onChange={handleSendImage}
                    />
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        onKeyDown={(e)=>e.key==="Enter" ? handleSendMessage(e) : null}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 placeholder-gray-400"
                    />
                    <img onClick={handleSendMessage} src={sendIcon} alt="" className="w-6 cursor-pointer opacity-80 filter brightness-0" />
                </div>
            </div>

        </div>

        
    ) : (
            <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
                <img src={logo} alt="" className='max-w-16 filter brightness-0 opacity-80' />
                <p className='text-lg font-medium text-gray-400'>Chat anytime, anywhere</p>
            </div>
    )
}