import { useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";
import { ChatContext } from "../../context/ChatContext";


export default function HomePage() {

    const {selectedUser} = useContext(ChatContext)

    return (
        <div className="w-full h-screen sm:px-[15%] sm:py-[5%] bg-[#f5f5f7]">
            <div
                className={`bg-white rounded-3xl overflow-hidden h-full grid grid-cols-1 relative shadow-lg
    ${selectedUser
                        ? 'md:grid-cols-[260px_1.7fr_0.9fr] xl:grid-cols-[280px_2fr_0.8fr]'
                        : 'md:grid-cols-[280px_1.7fr]'
                    }`}
            >
                <Sidebar />
                <ChatContainer />
                <RightSidebar />
            </div>
        </div>
    )
}