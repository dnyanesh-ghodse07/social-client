
import { useGetUserPostQuery } from "../../features/posts/postsSlice";
import { useParams } from "react-router-dom";
import PostUser from "../PostUser";
import NoData from "../NoData";
import { PostType } from "../../type";

const YourPosts = () => {
  const { userId } = useParams();
  const { data: postData } = useGetUserPostQuery(userId);
  return (
    <div>
      <div className="flex flex-col gap-2">
        {!postData?.posts?.length && <NoData message="No post available" />}
        {postData?.posts?.map((post: PostType) => {
          return <PostUser key={post._id} post={post} userId={userId} />;
        })}
      </div>
    </div>
  );
};

export default YourPosts;
