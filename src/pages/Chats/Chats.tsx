import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { useNavigate } from "react-router-dom";

import Chat from '../../components/Chat'
import UserItem from '../../components/UserItem'

import { useUser } from '../../context/userProvider'

function Chats() {
    const navigate = useNavigate();
    const { userID } = useUser()
    const [currentChatId, setCurrentChatId] = useState<number | null>(null);
    const users = useAppSelector((state) => state.users.users)
    const listUsers = users.filter((item) => item.id !== userID)

    const openChat = (id: number) => {
        const width = window.innerWidth
        if(width > 576) {
            setCurrentChatId(id);
        } else {
            navigate(`/chats/${id}`)
        }
    }

    return (
        <div className='chats'>
            <div className='chats_sidebar'>
                <p className='chats_sidebar_title'>Users</p>
                {listUsers.map((item) => <UserItem
                    nickname={item.nickname} 
                    key={item.id} 
                    isOnline={item.isOnline}
                    id={item.id}
                    isActive={currentChatId === item.id}
                    onClick={(id: number) => {openChat(id)}}
                />)}
            </div>
            <div className='chats_content'>
            {currentChatId !== null && <Chat currentChatId={currentChatId} />}
            </div>
        </div>
    )
}

export default Chats
