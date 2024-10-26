import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
} from "../features/chat/chatSlice";
import dateFormat from "dateformat";
import { useGetUserQuery } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Button, Input } from "antd";
import { IoMdSend } from "react-icons/io";

interface ChatProps {
  currentUserId: string | undefined;
  selectedUserId: string | undefined;
}

// Define a type for the message sender
interface Sender {
  _id: string;
  username: string;
}

// Define a type for individual message
interface Message {
  sender: Sender;
  content: string;
  _id: string;
  timestamp: string;
}

// Initialize the socket once globally
const socket = io("https://stoked-keyword-436905-f9.el.r.appspot.com/", {
  withCredentials: true, // Allows credentials (like cookies) if needed
  transports: ["polling", "websocket"],
});

const Chat = ({ currentUserId, selectedUserId }: ChatProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUser = useSelector((state: RootState) => state.auth.username);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch chat messages between the current user and the selected user
  const { data: fetchedMessages, isLoading } = useGetChatMessagesQuery({
    user1Id: currentUserId,
    user2Id: selectedUserId,
  });

  const { data: user } = useGetUserQuery(selectedUserId);

  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    socket.emit("joinRoom", currentUserId);

    return () => {
      socket.emit("leaveRoom", currentUserId);
    };
  }, [currentUserId]);

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages.messages);
    }
  }, [fetchedMessages]);

  console.log(fetchedMessages);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up socket listener when component unmounts
    return () => {
      socket.off("newMessage");
    };
  }, []);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        senderId: currentUserId,
        receiverId: selectedUserId,
        content: newMessage,
      };

      try {
        // Emit the message to the server via socket
        socket.emit("sendMessage", messageData);

        // Send the message via the API to save it to the database
        await sendMessage(messageData);

        // Clear the input after sending
        setNewMessage("");

        // Scroll to bottom after sending the message
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="bg-slate-100 relative p-2">
      {isLoading ? (
        <p>Loading messages...</p>
      ) : (
        <div>
          <div className="sticky top-16 flex justify-between gap-2 capitalize p-2 bg-white">
            <h1>{user?.users.username}</h1>
            <h1>{currentUser}(You)</h1>
          </div>
          <div ref={chatContainerRef} className="flex flex-col gap-2 p-2 h-[calc(100vh-180px)] overflow-auto">
            {messages.length === 0 && (
              <h1 className="text-center">No Messages</h1>
            )}
            {messages?.map((msg, idx) => (
              <div
                key={idx}
                className={`w-1/2 p-1 rounded-md shadow-sm bg-slate-600 ${
                  msg?.sender?._id === currentUserId && "self-end"
                }`}
              >
                <div className="flex flex-col px-1 pt-1 text-slate-50">
                  <h1>{msg.content}</h1>
                  <span className="self-end text-[8px] p-0">
                    {dateFormat(msg?.timestamp, "h:MM TT")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="sticky bottom-2 gap-1 flex w-full mt-2 p-2">
        <Input
          type="text"
          className="py-2 w-full text-[16px] rounded-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button
          size="large"
          type="default"
          shape="circle"
          onClick={handleSendMessage}
          className="p-1 flex justify-center items-center"
        >
          <IoMdSend size={24}/>
        </Button>
      </div>
    </div>
  );
};

export default Chat;
