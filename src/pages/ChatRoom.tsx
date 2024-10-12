import { useParams } from "react-router-dom";
import Chat from "../components/Chat";

const ChatRoom = () => {
  const { currentUserId, selectedUserId } = useParams();

  return (
    <div>
      <Chat currentUserId={currentUserId} selectedUserId={selectedUserId} />
    </div>
  );
};

export default ChatRoom;
