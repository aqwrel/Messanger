
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { User } from '../users/usersSlice'

export interface Message {
    author: User,
    recipient: User,
    message: string
}

export interface Chat {
    id: number,
    messages: Message[],
    authorID: number,
    recipientId: number
}

// Define a type for the slice state
interface UsersState {
    chats: Chat[]
}

// Define the initial state using that type
const initialState: UsersState = {
    chats: [],
}

export interface ChangeStatus {
  id: number,
  status: boolean,
}


export const chatsSlice = createSlice({
    name: 'chats',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        createMessage: (state, action: PayloadAction<Message>) => {
            const {chats} = state
            const find = chats.find((chat) => {
                if(chat.authorID === action.payload.author.id && chat.recipientId === action.payload.recipient.id) return true
                if(chat.recipientId === action.payload.author.id && chat.authorID === action.payload.recipient.id) return true
            })
            if(!find) {
                chats.push({
                    id: chats.length,
                    messages: [action.payload],
                    authorID: action.payload.author.id,
                    recipientId: action.payload.recipient.id
                })
            } else {
                find.messages.push(action.payload)
            }
        },
    },
})

export const { createMessage } = chatsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chats

export default chatsSlice.reducer