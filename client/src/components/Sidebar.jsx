import { useNavigate } from 'react-router-dom'
import menuIcon from '../assets/menu.png'
import logo from '../assets/message-square-quote.png'
import search_icon from '../assets/user-round-search.png'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import personIcon from '../assets/person.png';



export default function Sidebar() {

    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setunseenMessages } = useContext(ChatContext)

    const { logout, onlineUsers } = useContext(AuthContext)
    
    const [input, setInput] = useState(false)

    const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users
    
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    },[onlineUsers])

    return (
        <div
            className={`h-full bg-[#f7f7fb] border-r border-gray-100 p-5 flex flex-col gap-4 text-slate-900 ${selectedUser ? 'max-md:hidden' : ''
                }`}
        >
            <div className="pd-5">
                <div className="flex justify-between items-center">
                    <img src={logo} alt="logo" className='max-w-40 filter brightness-0' />
                    <div className="relative py-2 group">
                        <img src={menuIcon} alt="Menu" className='max-h-5 cursor-pointer filter brightness-0' />
                        <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#4f4769] border border-gray-600 text-gray-100 hidden group-hover:block
                        '>
                            <p className='cursor-pointer' onClick={()=>navigate('/profile')}>Edit Profile</p>
                            <hr className='my-2 border-t border-t-gray-500' />
                            <p className='cursor-pointer text-sm text-red-600' onClick={()=>logout()}>LogOut</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-full flex items-center gap-2 py-2.5 px-4 mt-5 border border-gray-200 shadow-sm">
                    <img src={search_icon} alt="Search" className="w-4 opacity-60 filter brightness-0" />
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className="bg-transparent border-none outline-none text-sm text-slate-900 placeholder-gray-400 flex-1"
                        placeholder="Search user..."
                    />
                </div>

            </div>

            <div className='flex flex-col mt-4 gap-1'>
                {filteredUsers.map((user, index) => (
                    <div
                        onClick={() => { setSelectedUser(user); setunseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
                        key={index}
                        className={`relative flex items-center gap-2 p-2 pl-4 cursor-pointer max-sm:text-sm
                            border-none rounded-xl transition-colors
                            ${selectedUser?._id === user._id
                            ? 'bg-blue-200'
                                : 'bg-white hover:bg-blue-100'}`}
                          
                          
                    >
                  
                        <img
                            src={user?.profilePic || personIcon}
                            alt={user.fullName}
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
                        />
                        <div className='flex flex-col leading-5'>
                            <p>{user.fullName}</p>
                            {onlineUsers.includes(user._id)
                                ? <span className="text-green-500 text-xs">Online</span>
                                : <span className="text-gray-400 text-xs">Offline</span>
                            }

                        </div>
                        {unseenMessages[user._id] > 0 && (
                            <p className="absolute top-4.5 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-blue-500 text-white">
                                {unseenMessages[user._id]}
                            </p>
                        )}

                    </div>

                ))}

            </div>
        </div>
    )
}