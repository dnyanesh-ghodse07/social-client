import { useGetAllChatsQuery } from "../features/chat/chatSlice";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import NoData from "../components/NoData";

interface Sender {
  _id: string;
  username: string;
}

interface Message {
  sender: Sender;
  content: string;
  _id: string;
  timestamp: string;
}

interface ChatGroup {
  _id: string;
  members: Sender[];
  lastMessage: Message;
}

const ChatList = () => {
  const { userId } = useParams();
  const { data: allMessages } = useGetAllChatsQuery({ userId });

  return (
    <div className="p-4">
      <h2 className="py-2 px-2 font-bold">Messages</h2>
      <div className="flex flex-col gap-2">
        {!allMessages?.length && <NoData message="No messages available" />}
        {allMessages?.map((chat: ChatGroup) => {
          const otherUser = chat.members.filter(
            (member) => member._id !== userId
          );
          const sentOrReceive =
            chat.lastMessage.sender._id === userId ? "Sent" : "Received";
          return (
            <Link
              to={`/user/chat/${userId}/${otherUser[0]._id}`}
              key={chat._id}
            >
              <div className="flex justify-between border-y-[1px] p-[2px]">
                <div>
                  <h2 className="capitalize font-semibold">
                    @{otherUser[0].username}
                  </h2>
                  <p>
                    <span className="text-slate-400 text-sm">
                      {sentOrReceive}
                    </span>{" "}
                    {chat?.lastMessage?.content}
                  </p>
                </div>
                <span className="text-sm text-slate-500">
                  {dateFormat(chat?.lastMessage?.timestamp, "HH:MM:ss")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
