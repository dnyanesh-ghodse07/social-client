import { Link } from "react-router-dom";
import { PostType } from "../type";
import PostPlaceholder from "../assets/post_images.png";
import { Avatar } from "antd";
import UserIcon from "../assets/person_placeholder.jpg";
import { BiHeart } from "react-icons/bi";

const Post = ({ post }: { post: PostType }) => {
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
        <div className="w-full h-56">
          <img
            className="h-full w-full object-cover"
            src={post?.postImageUrl || PostPlaceholder}
            alt={`post${post._id}`}
          />
        </div>
        <p className="max-h-24 no-scrollbar overflow-scroll text-slate-600">
          {post.text}
        </p>
      </Link>
      <div className="flex gap-2 items-center pt-2">
        <p className="flex items-center gap-1">
          <BiHeart size={24} /> {post?.likes_count}
        </p>
      </div>
    </div>
  );
};

export default Post;
