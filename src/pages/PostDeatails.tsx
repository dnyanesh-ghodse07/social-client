import { useNavigate, useParams } from "react-router-dom";
import {
  useCommentOnPostMutation,
  useGetPostCommentsQuery,
  useGetPostQuery,
} from "../features/posts/postsSlice";
import dateFormat from "dateformat";
import { BsPerson } from "react-icons/bs";
import { BiLeftArrow, BiUpArrowAlt } from "react-icons/bi";
import { useState } from "react";

const PostDeatails = () => {
  const [commentQuery, setCommentQuery] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data: post } = useGetPostQuery(postId);
  const {
    data: comments,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPostCommentsQuery({ postId });

  const [addComment] = useCommentOnPostMutation();
  const handleAddComment = async () => {
    if (!commentQuery) return;
    await addComment({
      id: postId,
      commentData: { text: commentQuery },
    }).unwrap();
    setCommentQuery("");
    refetch();
  };
  return (
    <div className="p-4">
      <button className="mb-4 text-slate-500 border-2 px-1 flex items-center" onClick={() => navigate(-1)}>
        {" "}
        <BiLeftArrow />
        Back
      </button>
      <div>
        <div className="flex justify-between">
          <h2 className="text-slate-600">@{post?.post?.user_id?.username}</h2>
          <span className="text-slate-400">
            {dateFormat(post?.post?.createdAt, "fullDate")}
          </span>
        </div>
        <p className="my-2">{post?.post?.text}</p>
        <div>
          <button className="font-bold">Likes {post?.likes_count}</button>
        </div>
      </div>
      <div className="flex items-center my-4 gap-2 w-full">
        <input
          value={commentQuery}
          className="outline-none border-[1px] p-2 w-full"
          type="text"
          placeholder="Add a comment"
          onChange={(e) => setCommentQuery(e.target.value)}
        />
        {commentQuery && (
          <button
            className="bg-slate-600 p-1 rounded-full text-slate-50"
            onClick={handleAddComment}
          >
            <BiUpArrowAlt size={24} />
          </button>
        )}
      </div>
      <div>
        <h2>Commnets</h2>
        {isError && <p>{error?.message}</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {comments?.map((comment) => {
              return (
                <div key={comment._id} className="">
                  <div className="flex items-center gap-1">
                    <BsPerson />
                    <span className="font-bold text-sm">
                      {comment?.user_id?.username}
                    </span>
                  </div>
                  <div className="pl-5">
                    <p>{comment?.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDeatails;
