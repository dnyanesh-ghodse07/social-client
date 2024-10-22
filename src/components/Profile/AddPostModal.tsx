import { Modal, Button, message, Input } from "antd";
import { useState } from "react";
import { useCreatePostMutation } from "../../features/posts/postsSlice";
const { TextArea } = Input;

const AddPostModal = ({
  openMessageModal,
  setOpenMessageModal,
}: {
  openMessageModal: boolean;
  setOpenMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const [openMessageModal, setOpenMessageModal] = useState(false);
  const [createPost, { isLoading: isPostCreating }] = useCreatePostMutation();
  const [messageInputValue, setMessageInputValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedPostFile, setSelectedPostFile] = useState<File | null>();

  const handlePostImageSubmit = async () => {
    if (!selectedPostFile) {
      messageApi.open({
        type: "info",
        content: "Please select a file to upload.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("postImage", selectedPostFile);
    formData.append("text", messageInputValue);

    try {
      await createPost(formData).unwrap(); // Unwrap returns the actual response or error
      setMessageInputValue("");
      setOpenMessageModal(false);
      messageApi.open({
        type: "success",
        content: "Post created successfully.",
      });
    } catch (err) {
      console.error("Failed to upload profile picture", err);
    }
  };

  const handlePostFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPostFile(e.target.files[0]);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Create Post"
        onCancel={() => setOpenMessageModal(false)}
        open={openMessageModal}
        footer={
          <div className="flex justify-end gap-1">
            <Button onClick={() => setOpenMessageModal(false)}>Cancel</Button>
            <Button
              disabled={isPostCreating}
              type="primary"
              color="primary"
              onClick={handlePostImageSubmit}
              loading={isPostCreating}
            >
              Create
            </Button>
          </div>
        }
      >
        <div className="flex gap-2 flex-col">
          <label htmlFor="post-pic">
            <div className="flex border p-4 border-dotted gap-2 justify-center items-center">
              <span>Choose post image</span>
            </div>
            <input
              type="file"
              id="post-pic"
              className="hidden"
              accept="image/*"
              onChange={handlePostFileChange}
            />
          </label>
          <TextArea
            value={messageInputValue}
            onChange={(e) => setMessageInputValue(e.target.value)}
            placeholder="Your message"
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddPostModal;
