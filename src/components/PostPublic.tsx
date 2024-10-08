import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { PostType } from "../type";

const Post = ({ post }: { post: PostType }) => {
  return (
    <div key={post._id} className="min-w-56 flex-1 p-2 border-[1px] rounded-md">
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
  );
};

export default Post;
