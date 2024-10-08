import { useNavigate, useParams } from "react-router-dom";
import {
  useCommentOnPostMutation,
  useGetPostCommentsQuery,
  useGetPostQuery,
} from "../features/posts/postsSlice";
import dateFormat from "dateformat";
import { BiLeftArrow, BiUpArrowAlt } from "react-icons/bi";
import { useState } from "react";
import { Comment } from "../type";
import Loader from "../components/Loader";
import Like from "../components/Like";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import CommentBox from "../components/CommentBox";

const PostDeatails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [commentQuery, setCommentQuery] = useState("");
  const { data: post, isLoading: postLoading, error } = useGetPostQuery(postId);
  if (error && "status" in error) {
    const fetchError = error as FetchBaseQueryError;
    if (fetchError.status === 401) {
      localStorage.removeItem('token');
      // navigate("/login");
    }
  }
  const {
    data: comments,
    isLoading,
    isError,
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
      <button
        className="mb-4 text-slate-500 border-2 px-1 flex items-center"
        onClick={() => navigate(-1)}
      >
        {" "}
        <BiLeftArrow />
        Back
      </button>
      {postLoading ? (
        <div className="w-full h-56 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <h2 className="text-slate-600">@{post?.post?.user_id?.username}</h2>
            <span className="text-slate-400">
              {dateFormat(post?.post?.createdAt, "fullDate")}
            </span>
          </div>
          <p className="my-2">{post?.post?.text}</p>
          <div className="flex gap-1">
            <Like postId={postId as string} isLiked={post?.userHasLiked} />
            <span>{post?.likes_count}</span>
          </div>
        </div>
      )}
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
        <h2>Commnets ({comments?.length})</h2>
        {isError && <p>{"Something went wrong"}</p>}
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {comments?.map((comment: Comment) => {
              return (
                <CommentBox comment={comment}/>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDeatails;
