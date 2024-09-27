import { useNavigate, useParams } from "react-router-dom";
import {
  useCommentOnPostMutation,
  useDislikePostMutation,
  useGetPostCommentsQuery,
  useGetPostQuery,
  useLikePostMutation,
} from "../features/posts/postsSlice";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import dateFormat from "dateformat";
import { BsPerson } from "react-icons/bs";
import { BiLeftArrow, BiUpArrowAlt } from "react-icons/bi";
import { useState } from "react";
import { Comment } from "../type";
import Loader from "../components/Loader";

const PostDeatails = () => {
  const [commentQuery, setCommentQuery] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();

  const [likePost, { isLoading: likeLoading }] = useLikePostMutation();
  const [dislikePost, { isLoading: dislikeLoading }] = useDislikePostMutation();

  const { data: post,isLoading: postLoading } = useGetPostQuery(postId);
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

  const handleLikeDislike = async () => {
    if (post?.userHasLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
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
      {postLoading ? <div className="w-full h-56 flex justify-center items-center">
            <Loader/>
          </div> : <div>
        <div className="flex justify-between">
          <h2 className="text-slate-600">@{post?.post?.user_id?.username}</h2>
          <span className="text-slate-400">
            {dateFormat(post?.post?.createdAt, "fullDate")}
          </span>
        </div>
        <p className="my-2">{post?.post?.text}</p>
        <div className="flex gap-1">
          {post?.userHasLiked ? (
            <button onClick={handleLikeDislike} disabled={dislikeLoading}>
              <IoMdHeart size={24}/>
            </button>
          ) : (
            <button onClick={handleLikeDislike} disabled={likeLoading}>
              <IoMdHeartEmpty size={24}/>
            </button>
          )}
          <span>{post?.likes_count}</span>
        </div>
      </div>}
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
            <Loader/>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {comments?.map((comment: Comment) => {
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
