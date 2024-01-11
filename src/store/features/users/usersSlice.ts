import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export interface User {
    id: number,
    nickname: string,
    isOnline: boolean
}

// Define a type for the slice state
interface UsersState {
    users: User[]
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
}

export interface ChangeStatus {
  id: number,
  status: boolean,
}


export const usersSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    push: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload)
    },
    setStatus: (state, action: PayloadAction<ChangeStatus>) => {
      const index = state.users.findIndex((item) => item.id === action.payload.id)
      state.users[index].isOnline = action.payload.status
    },
  },
})

export const { push, setStatus } = usersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.users

export default usersSlice.reducer