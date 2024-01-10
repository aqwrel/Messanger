import UserItem from '../../components/UserItem'
import { useAppSelector } from '../../store/hooks'

function Chats() {
  const users = useAppSelector((state) => state.users)

  return (
    <div className='chats'>
      <div className='chats_sidebar'>
        <p className='chats_sidebar_title'>Users</p>
        {users.map((item) =>
          (<UserItem nickname={item.nickname} key={item.id} isOnline={item.isOnline} />)
        )}
      </div>
    </div>
  )
}

export default Chats
