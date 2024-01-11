import PropTypes, { InferProps } from 'prop-types';
import Avatar from './Avatar';

function UserItem({nickname, isOnline, id, isActive, onClick}: InferProps<typeof UserItem.propTypes>) {
  return (
    <div className={`user-item ${isActive ? 'user-item--active' : ''}`} onClick={() => onClick(id)}>
        <div className='user-item_avatar'>
        <Avatar initials={`${nickname[0]}${nickname[1]}`} />
        <span className={`user-item_status ${isOnline ? 'user-item_status--online' : 'user-item_status--offline'}`}></span>
        </div>
        <p className='user-item_nickname'>{nickname}</p>
    </div>
  )
}

UserItem.propTypes = {
    nickname: PropTypes.string.isRequired,
    isOnline: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    isActive: PropTypes.bool,
};

export default UserItem
