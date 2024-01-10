import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import { push } from '../../store/features/users/usersSlice'

function SignIn() {
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users)
  
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const dispatch = useAppDispatch()

  const validate = (nickname:string) => {
    if(nickname.length === 0) return 'Complete the field'
    if(nickname.length < 8) return 'Must be at least 8 characters'
    if(nickname.length > 12) return 'Cannot be more than 12 characters'
    if(!/^[\p{L}\p{N}_]+$/u.test(nickname)) return 'Only letters or numbers or "_"'
    if(users.findIndex((item) => item.nickname === nickname) !== -1) return 'Nickname is exist'
    return ''
  }

  const signIn = () => {
    setNicknameError(validate(nickname));
    if(nicknameError) return
    
    const id = users.length;
    dispatch(push({
      id,
      nickname,
      isOnline: true
    }))
    sessionStorage.setItem("currentUser", `${id}`);

    navigate("/chats");
  }

  return (
    <div className='sign-in'>
        <div className='sign-in_form'>
            <p className='heading-1 sign-in_title'>Sign In</p>
            <div>
                <Input 
                  placeholder='Enter your nickname'
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  error={nicknameError}
                />
            </div>
            <Button title="Sign in" onClick={() => {signIn()}} />
        </div>
    </div>
  )
}

export default SignIn
