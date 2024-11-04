import { Badge, Button, Dropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { GrNotification } from "react-icons/gr";
import socket from "../socket";

interface NotificationData {
  type: string;
  message: string;
  postId?: string;
  commentId?: string;
  followerId?: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    // Check if socket is connected
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("receiveNotification", (notification) => {
      console.log("notification", notification);
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("receiveNotification")
    };
  }, []);

  const items: MenuProps["items"] = notifications.map(
    (notification, index) => ({
      label: notification.message,
      key: `${index}`,
    })
  );

  return (
    <div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Badge size="small" count={notifications.length}>
            <Button size="small" shape="circle" className="">
              <GrNotification />
            </Button>
          </Badge>
        </a>
      </Dropdown>
    </div>
  );
};

export default Notification;
