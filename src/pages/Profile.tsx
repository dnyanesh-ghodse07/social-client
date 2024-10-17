import { useParams } from "react-router-dom";
import {
  useFollowUserMutation,
  useGetFollowerQuery,
  useGetUserQuery,
  useUnfollowUserMutation,
  useUploadProfilePicMutation,
} from "../features/user/userSlice";
import { Button, message, Modal } from "antd";
import {
  useCreatePostMutation,
  useGetUserPostQuery,
} from "../features/posts/postsSlice";
import PostUser from "../components/PostUser";
import { PostType } from "../type";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import placeholderImage from "../assets/person_placeholder.jpg";
import Loader from "../components/Loader";
import TextArea from "antd/es/input/TextArea";

const Profile = () => {
  const { userId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [selectedPostFile, setSelectedPostFile] = useState<File | null>();

  const [messageInputValue, setMessageInputValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [uploadProfilePic, { isLoading }] = useUploadProfilePicMutation();
  const [createPost, { isLoading: isPostCreating }] = useCreatePostMutation();
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  const { data: userData, isLoading: loadingUserData } =
    useGetUserQuery(userId);
  const { data: postData } = useGetUserPostQuery(userId);
  const { data: followers } = useGetFollowerQuery(userId);

  const [unFollow] = useUnfollowUserMutation();
  const [followUser] = useFollowUserMutation();

  const handleFollow = () => {
    followUser(userId);
  };

  const handleUnfollow = () => {
    unFollow(userId);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePostFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPostFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      await uploadProfilePic(formData).unwrap(); // Unwrap returns the actual response or error
      messageApi.open({
        type: "success",
        content: "Profile picture uploaded successfully!",
      });
    } catch (err) {
      console.error("Failed to upload profile picture", err);
    }
  };

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

  if (loadingUserData) return <Loader />;
  return (
    <div className="mx-2 p-2">
      {contextHolder}
      <div className="w-full flex justify-center max-h-56 rounded-md p-4 gap-4 mb-2">
        <div className="relative w-36 h-36">
          <img
            className="w-full h-full rounded-full object-cover"
            src={userData?.users?.profilePicture || placeholderImage}
            alt="profile-pic"
          />
          {currentUserId === userId && (
            <TbUserEdit
              size={24}
              className="cursor-pointer border border-slate-700 absolute -right-0 bg-white rounded-full p-1 bottom-10"
              onClick={() => setOpenModal(true)}
            />
          )}
        </div>
        <Modal
          title="Upload image"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={
            <div className="flex justify-end gap-1">
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              <Button
                disabled={isLoading}
                type="primary"
                color="primary"
                onClick={handleSubmit}
              >
                Upload
              </Button>
            </div>
          }
        >
          <label htmlFor="profile-pic">
            <div className="flex border p-4 border-dotted gap-2 justify-center items-center">
              <span>Choose photo</span>
            </div>
            <input
              type="file"
              id="profile-pic"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </Modal>
        <div className="flex-auto flex flex-col gap-4 w-full text-sm">
          <div className="flex gap-2 items-start">
            <h1>@{userData?.users?.username}</h1>
            {currentUserId !== userId && (
              <>
                {followers?.isFollowing ? (
                  <Button
                    color="primary"
                    type="default"
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button color="primary" type="primary" onClick={handleFollow}>
                    Follow
                  </Button>
                )}
                <Link to={`/user/chat/${currentUserId}/${userId}`}>
                  <Button>Message</Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex gap-2 items-center font-semibold">
            <span>{postData?.totalPosts} Posts</span>
            <span>{followers?.followerCount} Followers</span>
            <span>{followers?.followingCount} Following</span>
          </div>
          <p className="text-slate-400">To infinity and beyond!</p>
        </div>
      </div>
      {currentUserId === userId && <div>
        <Button onClick={() => setOpenMessageModal(true)}>Create Post</Button>
      </div>}
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
        <div>
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
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
      </Modal>
      <h2 className="text-xl font-semibold py-2">Posts</h2>
      <div className="flex flex-col gap-2">
        {postData?.posts?.map((post: PostType) => {
          return <PostUser key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
