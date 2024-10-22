import { Button, Tabs, TabsProps } from "antd";
import { CiBookmark } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import YourPosts from "./YourPosts";
import SavedPosts from "./SavedPosts";
import AddPostModal from "./AddPostModal";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const items: TabsProps["items"] = [
  {
    key: "2",
    label: (
      <span className="flex gap-1">
        <IoGridOutline size={20} />
        <h2 className="hidden sm:block">Your Post</h2>
      </span>
    ),
    children: <YourPosts />,
  },
  {
    key: "3",
    label: (
      <span className="flex gap-1">
        <CiBookmark size={20} />
        <h2 className="hidden sm:block">Saved Post</h2>
      </span>
    ),
    children: <SavedPosts />,
  },
];

export const PostSection = () => {
  const [openMessageModal, setOpenMessageModal] = useState(false);

  const handleOpenModal = () => {
    setOpenMessageModal(true);
  };


  return (
    <>
      <Tabs
        defaultActiveKey="2"
        items={items}
        tabBarExtraContent={
          <Button type="default"
           color="default"
            onClick={handleOpenModal}
            className="flex items-center gap-1 text-blue-500"
          >
            <IoIosAddCircleOutline size={20} />
            <h2 className="hidden sm:block">Add Post</h2>
          </Button>
        }
      />
      <AddPostModal openMessageModal={openMessageModal} setOpenMessageModal={setOpenMessageModal} />
    </>
  );
};
