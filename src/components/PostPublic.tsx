import { Link } from "react-router-dom";
import { PostType } from "../type";
import PostPlaceholder from "../assets/post_images.png";
import { Avatar, Button } from "antd";
import UserIcon from "../assets/person_placeholder.jpg";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useSavePostMutation, useUnSavePostMutation } from "../features/posts/postsSlice";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";

const Post = ({ post }: { post: PostType }) => {
  const [savePost, { isLoading: savingPost }] = useSavePostMutation();
  const [unsavePost, { isLoading: unsavingPost }] = useUnSavePostMutation();
  const handleSavePost = (postId: string) => {
    savePost(postId);
  };

  const handleUnSavePost = (postId: string) => {
    unsavePost(postId);
  }
  return (
    <div key={post._id} className="min-w-56 flex-1 p-2 border-[1px] rounded-md">
      <Link to={`/community/post/${post._id}`}>
        <p className="text-slate-400 flex items-center pb-1">
          <Link to={`/user/profile/${post.user._id}`}>
            <div className="flex items-center gap-2">
              <Avatar
                className="-z-10"
                src={post.user?.profilePicture || UserIcon}
              />
              <span className="text-sm font-thin">{post.user?.username}</span>
            </div>
          </Link>
        </p>
        <div className="w-full h-56 p-2">
          <img
            className="h-full w-full object-cover rounded-md"
            src={post?.postImageUrl || PostPlaceholder}
            alt={`post${post._id}`}
          />
        </div>
        <p className="max-h-24 no-scrollbar overflow-scroll text-slate-600">
          {post.text}
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

export default Post;
