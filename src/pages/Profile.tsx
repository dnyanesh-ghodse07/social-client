import { useNavigate, useParams } from "react-router-dom";
import {
  useFollowUserMutation,
  useGetFollowerQuery,
  useGetUserQuery,
  useUnfollowUserMutation,
  useUploadProfilePicMutation,
} from "../features/user/userSlice";
import { Button, message, Modal } from "antd";
import { useGetUserPostQuery } from "../features/posts/postsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import placeholderImage from "../assets/person_placeholder.jpg";
import Loader from "../components/Loader";
import { ImInfo } from "react-icons/im";
import EditProfile from "../components/Profile/EditProfile";

import { PostSection } from "../components/Profile/PostSection";
import YourPosts from "../components/Profile/YourPosts";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [openModal, setOpenModal] = useState(false);
  const [uploadProfilePic, { isLoading }] = useUploadProfilePicMutation();
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  const isAuthorised = currentUserId === userId;
  const { data: userData, isLoading: loadingUserData } =
    useGetUserQuery(userId);
  const { data: postData } = useGetUserPostQuery(userId);
  const { data: followers } = useGetFollowerQuery(userId);

  const [unFollow] = useUnfollowUserMutation();
  const [followUser] = useFollowUserMutation();

  const handleFollow = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
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

  const handleMessage = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(`/user/chat/${currentUserId}/${userId}`);
    }
  };

  if (loadingUserData) return <Loader />;
  return (
    <div className="mx-2 p-2">
      {contextHolder}
      <div className="flex gap-4 p-4">
        <div className="relative w-fit">
          <img
            className="w-24 md:w-34 rounded-full object-cover"
            src={userData?.users?.profilePicture || placeholderImage}
            alt="profile-pic"
          />
          {isAuthorised && (
            <TbUserEdit
              size={24}
              className="cursor-pointer border border-slate-700 absolute -right-2 bg-white rounded-full p-1 bottom-3"
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
          <p className="flex items-center gap-1 py-2 text-slate-400">
            <ImInfo /> Upload a square image (less than 5MB)
          </p>
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
        <div className="flex-1 flex flex-col gap-4 text-sm">
          <div className="flex flex-col md:flex-row gap-2 items-start">
            <h1>@{userData?.users?.username}</h1>
            {currentUserId !== userId && (
              <div className="flex gap-2">
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
                <Button onClick={handleMessage}>Message</Button>
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center text-sm  md:text-md">
            <span>{postData?.totalPosts} Posts</span>
            <span>
              {followers?.followerCount ? followers?.followerCount : 0}{" "}
              Followers
            </span>
            <span>
              {followers?.followingCount ? followers?.followingCount : 0}{" "}
              Following
            </span>
          </div>
          <p className="text-slate-400">To infinity and beyond!</p>
        </div>
        {isAuthorised && (
          <div className="flex gap-2 h-fit items-center">
            <EditProfile />
          </div>
        )}
      </div>
      {isAuthorised ? (
        <PostSection />
      ) : (
        <div>
          <h2 className="py-4">Posts</h2>
          <YourPosts />
        </div>
      )}
    </div>
  );
};

export default Profile;
