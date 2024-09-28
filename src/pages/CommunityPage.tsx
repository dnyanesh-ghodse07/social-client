import { Post } from "../type";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useGetAllPostsQuery } from "../features/posts/postsSlice";
import Loader from "../components/Loader";

const CommunityPage = () => {
  const { data: posts, isLoading, isError } = useGetAllPostsQuery({});

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isError) return <p>Something went wrong..</p>;
  console.log(posts);
  return (
    <div className="p-4">
      <h1 className="my-4 text-xl">Community</h1>
      <div className="flex flex-col gap-4">
        {posts?.posts?.map((post: Post) => (
          <div key={post._id} className="min-w-56 flex-1 p-2 shadow-md">
            <Link to={`/community/post/${post._id}`}>
              <p className="text-slate-400 flex items-center pb-1">
                <CiUser size={20} />@{post?.user?.username}
              </p>
              <p className="max-h-24 no-scrollbar overflow-scroll text-slate-600">
                {post.text}
              </p>
            </Link>
            <div className="flex gap-2 items-center pt-2">
              <p className="flex items-center gap-1">
                <FaHeart /> {post?.likes_count}
              </p>
              <button>
                <FaRegComment />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
