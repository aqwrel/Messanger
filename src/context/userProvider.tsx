import { createContext, useContext, useEffect } from "react"
import PropTypes, { InferProps } from 'prop-types';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../store/hooks'
import { setStatus } from '../store/features/users/usersSlice'

interface User {
    userID: number,
}

export const UserContext = createContext<User>({ userID: -1 })

export function UserProvider({children}: InferProps<typeof UserProvider.propTypes>) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const ID = sessionStorage.getItem('currentUser')
    const userID:number = typeof ID === 'string' ? JSON.parse(ID) : -1
    
    useEffect(() => {
        if(userID === -1) {
            return navigate('/')
        }
    }, [userID])

    if(userID !== -1) {
        dispatch(setStatus({
            id: userID,
            status: true
        }))
    }

    const handleTabClosing = () => {
        if(userID !== -1) {
            dispatch(setStatus({
                id: userID,
                status: false
            }))
        }
    }

    useEffect(() => {
        window.addEventListener('unload', handleTabClosing)
        return () => {
            window.removeEventListener('unload', handleTabClosing)
        }
    }, [])
    
    return (
        <UserContext.Provider value={{userID}}>
            { children }
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


export const useUser = () => {
    return useContext(UserContext)
}