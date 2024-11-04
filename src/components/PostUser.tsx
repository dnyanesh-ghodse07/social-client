import { BiTrash } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { PostType } from "../type";
import {
  useDeletePostMutation,
  useSavePostMutation,
  useUnSavePostMutation,
} from "../features/posts/postsSlice";
import { FaRegComment, FaHeart } from "react-icons/fa";
import { Button, Popover } from "antd";
import PostPlaceholder from "../assets/post_images.png";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmarkSharp } from "react-icons/io5";

const PostUser = ({ post }: { post: PostType }) => {
  const { userId } = useParams();
  const { userId: currentUserId } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthorisedUser = userId === currentUserId;
  const [deletePost, { isLoading: deleting }] = useDeletePostMutation();
  const [savePost, { isLoading: savingPost }] = useSavePostMutation();
  const [unsavePost, { isLoading: unsavingPost }] = useUnSavePostMutation();

  const handleDelete = (postId: string) => {
    deletePost(postId);
  };
  
  const handleSavePost = (postId: string) => {
    savePost(postId);
  };

  const handleUnSavePost = (postId: string) => {
    unsavePost(postId);
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
        {isAuthorisedUser && post?.user?._id === currentUserId && (
          <Button
            size="small"
            type="link"
            className="text-red-500 relative"
            disabled={deleting}
          >
            <Popover
              placement="left"
              content={
                <div className="flex justify-between text-sm">
                  <Button type="link" size="small" className="border-b-2 text-xs">Cancel</Button>
                  <Button type="link"
                    size="small"
                    className="border-b-2 text-xs text-rose-400"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </div>
              }
              title="Are you sure to delete this?"
              trigger="click"
            >
              <BiTrash />
            </Popover>
          </Button>
        )}
      </div>
      <Link to={`/myspace/post/${post._id}`}>
        <div className="w-full h-56 py-2">
          <img
            className="h-full w-full object-cover rounded-md"
            src={post?.postImageUrl || PostPlaceholder}
            alt={`post${post._id}`}
          />
        </div>
        <p className="max-h-24 no-scrollbar overflow-scroll text-slate-600">
          {post.text.substring(0, 150)}...
        </p>
      </Link>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center pt-2">
          <p className="flex items-center gap-1">
            <FaHeart size={20} /> {post?.likes_count}
          </p>
          <button>
            <FaRegComment size={20} />
          </button>
        </div>
        <div>
          {post?.isSaved ? <Button size="small" type="link" disabled={unsavingPost}>
            <IoBookmarkSharp size={20} onClick={() => handleUnSavePost(post._id)} />
          </Button> : <Button size="small" type="link" disabled={savingPost}>
            <IoBookmarkOutline size={20} onClick={() => handleSavePost(post._id)} />
          </Button>}
        </div>
      </div>
    </div>
  );
};

export default PostUser;
