import { BiTrash } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { PostType } from "../type";
import { useDeletePostMutation } from "../features/posts/postsSlice";
import { FaRegComment, FaHeart } from "react-icons/fa";
import { Popover } from "antd";
import PostPlaceholder from '../assets/post_images.png';
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const PostUser = ({ post }: { post: PostType }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [deletePost, { isLoading: deleting }] = useDeletePostMutation();
  const handleDelete = (postId: string) => {
    deletePost(postId);
  };
  return (
    <div
      key={post._id}
      className="min-w-56 flex-1 px-4 py-2 border-[1px] rounded-md"
    >
      <div className="flex justify-between items-center">
        <p className="text-slate-400 flex items-center pb-1">
          <CiUser size={20} />@{post?.user?.username}
        </p>
       {isAuthenticated && <button
          className="text-red-500 relative"
          disabled={deleting}
          // onClick={() => handleDelete(post._id)}
        >
          <Popover
            placement="left"
            content={
              <div className="flex justify-between text-sm">
                <button className="border-b-2 text-xs">Cancel</button>
                <button
                  className="border-b-2 text-xs text-rose-400"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            }
            title="Are you sure to delete this?"
            trigger="click"
          >
            <BiTrash />
          </Popover>
        </button>}
      </div>
      <Link to={`/myspace/post/${post._id}`}>
      <div className="w-full h-56">
       <img className="h-full w-full object-cover" src={post?.postImageUrl || PostPlaceholder} alt={`post${post._id}`} />
      </div>
        <p className="max-h-24 no-scrollbar overflow-scroll text-slate-600">
          {post.text.substring(0,150)}...
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

export default PostUser;
