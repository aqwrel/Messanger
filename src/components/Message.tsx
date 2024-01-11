import PropTypes, { InferProps } from 'prop-types';

function Message({message, nickname, isFromCurrentUser }: InferProps<typeof Message.propTypes>) {
    return (
        <div className={`message ${isFromCurrentUser ? 'message--left' : 'message--right'}`}>
            <p className='message_author'>{nickname}</p>
            <div className={`message_content ${isFromCurrentUser ? 'message_content--left' : 'message_content--right'}`}>
                {message}
            </div>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    isFromCurrentUser: PropTypes.bool.isRequired
};

export default Message
