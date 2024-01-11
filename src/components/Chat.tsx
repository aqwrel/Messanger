import { useEffect, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { createMessage } from '../store/features/chats/chatsSlice';
import { useUser } from '../context/userProvider';

import Button from './Button';
import Avatar from './Avatar';
import Message from './Message';

function Chat({ currentChatId }: InferProps<typeof Chat.propTypes>) {
    const { userID } = useUser()
    const [message, setMessage] = useState('');
    const users = useAppSelector((state) => state.users.users)
    const recipient = users.find(user => user.id === currentChatId)!
    const author = users.find(user => user.id === userID)!;

    const chats = useAppSelector((state) => state.chats.chats)

    const chat = chats.find((item) => {
        if (item.authorID === author.id && item.recipientId === recipient.id) return true
        if (item.recipientId === author.id && item.authorID === recipient.id) return true
        return false
    })

    const dispatch = useAppDispatch()

    const sendMessage = () => {
        dispatch(createMessage({
            author,
            recipient,
            message
        }));
        setMessage('')
    }

    useEffect(()=> {
        const listMessages = document.querySelector('.messages')!
        listMessages.scrollTo(0, listMessages.scrollHeight);
    }, [chat?.messages])

    return (
        <div className={`chat ${currentChatId === null ? 'chat--empty' : ''}`}>
            <header className='chat_header'>
                <Avatar initials={`${recipient.nickname[0]}${recipient.nickname[1]}`} />
                <p>{recipient.nickname}</p>
            </header>

            <main className='messages'>
                {chat?.messages.map((item, index) => (<Message
                    key={index}
                    message={item.message}
                    nickname={item.author.nickname}
                    isFromCurrentUser={userID === item.author.id}
                />))}
            </main>

            <footer className='chat_footer'>
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <Button title='Send' onClick={() => sendMessage()} />
            </footer>
        </div>
    )
}

Chat.propTypes = {
    currentChatId: PropTypes.number.isRequired,
};


export default Chat
