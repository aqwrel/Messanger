import Chat from "../../components/Chat"
import {useParams, Link} from "react-router-dom";

function ChatsDetails() {
    const { id } = useParams();
    
    return (
        <>
            <Link to="/chats">Back</Link>
            <Chat currentChatId={Number(id)} />
        </>
    )
}

export default ChatsDetails
