
import { useContext, useEffect, useState } from 'react'
import personIcon from '../assets/person.png'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

export default function RightSidebar() {

    const { selectedUser, messages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])

    //get all the images from the messages and set them to state
    useEffect(() => {
        setMsgImages(
            messages.filter(msg => msg.image).map(msg=>msg.image)
        )
    },[messages])
    return selectedUser && (
        <div
            className={`relative w-full h-full bg-[#f7f7fb] text-slate-900 border-l border-gray-100 flex flex-col
    ${selectedUser ? 'max-md:hidden' : ''}`}
        >

            
            <div className="px-5 pt-10 pb-6">
                <div className="bg-white rounded-2xl px-5 py-6 flex flex-col items-center gap-2 shadow-sm">
                    <img
                        src={selectedUser?.profilePic || personIcon}
                        alt=""
                        className="w-20 aspect-square rounded-full object-cover"
                    />
                    <h1 className="text-base font-semibold flex items-center gap-2">
                        {onlineUsers.includes(selectedUser._id) && (
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                        )}
                        {selectedUser.fullName}
                    </h1>
                    <p className="text-xs text-gray-500 text-center">
                        {selectedUser.bio}
                    </p>
                </div>
            </div>


            <hr className="border-gray-200 mx-5" />

            

            <div className='px-5 text-xs'>
                <p className='text-black'>Img History</p>
                <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
                    {msgImages.map((url, index) => (
                        <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
                            <img src={url} alt="" className='w-20 h-15 rounded-md object-cover '/>
                        </div>
                    ))}

                </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 bg-[#f7f7fb] mt-auto">
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center justify-center gap-2
    rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500
    text-white text-sm font-semibold tracking-wide
    py-2.5 shadow-md shadow-violet-200
    hover:shadow-lg hover:brightness-110 active:scale-[0.98]
    transition-all duration-150 cursor-pointer"
                >
                    Logout
                </button>

            </div>


        </div>
    )
}