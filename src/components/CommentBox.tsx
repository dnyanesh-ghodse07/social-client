import { Comment } from "../type";
import { BsPerson } from "react-icons/bs";

const CommentBox = ({ comment }: { comment: Comment }) => {
  return (
    <div key={comment._id} className="">
      <div className="flex items-center gap-1">
        <BsPerson />
        <span className="font-bold text-sm">{comment?.user_id?.username}</span>
      </div>
      <div className="pl-5">
        <p>{comment?.text}</p>
      </div>
    </div>
  );
};

export default CommentBox;
