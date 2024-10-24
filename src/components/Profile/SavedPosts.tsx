import { useParams } from "react-router-dom";
import { useGetSavePostsQuery } from "../../features/posts/postsSlice"
import PostUser from "../PostUser";
import NoData from "../NoData";
import { PostType } from "../../type";

const SavedPosts = () => {
  const { userId } = useParams();
  const {data: savedPosts} = useGetSavePostsQuery(userId);

  return (
      <div className="flex flex-col gap-2">
        {!savedPosts?.posts?.length && <NoData message="No post available" />}
        {savedPosts?.posts?.map((post: PostType) => {
          return <PostUser key={post._id} post={post} />;
        })}
    </div>
  )
}

export default SavedPosts