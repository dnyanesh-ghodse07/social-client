import { useParams } from "react-router-dom";
import {
  useFollowUserMutation,
  useGetFollowerQuery,
  useGetUserQuery,
  useUnfollowUserMutation,
} from "../features/user/userSlice";
import { Button } from "antd";
import { useGetUserPostQuery } from "../features/posts/postsSlice";
import PostUser from "../components/PostUser";
import { PostType } from "../type";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const currentUserId =
    useSelector((state: RootState) => state.auth.userId);
  const { data: userData } = useGetUserQuery(userId);
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

  return (
    <div className="mx-2 p-2">
      <div className=" w-full max-h-56 rounded-md p-4 flex gap-4 mb-2">
        {/* <div className="max-w-40 max-h-40">
          <Avatar className="w-full h-full" />
        </div> */}
        <div className="flex flex-col gap-4 items-center w-full">
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
