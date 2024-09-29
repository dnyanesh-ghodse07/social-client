import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";

import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetUserPostQuery,
} from "../features/posts/postsSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface User {
  username: string;
}

interface Post {
  _id: string;
  text: string;
  likes_count: number;
  user: User; // Reference to the User type
}

const UserHome = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { data: posts, isLoading, isError, error } = useGetUserPostQuery({});
  const [createPost, { isLoading: createPostLoading }] =
    useCreatePostMutation();
  const [deletePost, { isLoading: deleting }] = useDeletePostMutation();

  //navigate to login if token expired
  if (error && "status" in error) {
    const fetchError = error as FetchBaseQueryError;
    if (fetchError.status === 401) {
      navigate("/login");
    }
  }

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  if (isError) return <p>Something went wrong..</p>;
  const handleSubmit = async () => {
    if (!text) return;
    try {
      await createPost({ text }).unwrap();
      setText("");
    } catch (error) {
      console.log("Failed to save the post", error);
    }
  };

  const handleDelete = (postId: string) => {
    deletePost(postId);
  };

  return (
    <div className="p-10">
      <div className="py-2 border-b-2 mb-4">
        <h2 className="text-2xl  capitalize text-cyan-600">Welcome</h2>
        <div className="my-2 shadow-sm bg-slate-100 w-full h-36 flex flex-col items-end p-[4px]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-[1px] w-full flex-1 mb-2 outline-none p-2"
          />
          <button
            className="bg-slate-700 text-slate-100 w-fit py-1 px-6"
            onClick={handleSubmit}
            disabled={createPostLoading}
          >
            {createPostLoading ? "Loading..." : "Post"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {posts?.posts?.map((post: Post) => {
          return (
            <div key={post._id} className="min-w-56 flex-1 px-4 py-2 shadow-md">
              <div className="flex justify-between items-center">
                <p className="text-slate-400 flex items-center pb-1">
                  <CiUser size={20} />@{post?.user?.username}
                </p>
                <button
                  className="text-red-500"
                  disabled={deleting}
                  onClick={() => handleDelete(post._id)}
                >
                  <BiTrash />
                </button>
              </div>
              <Link to={`/myspace/post/${post._id}`}>
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
        })}
      </div>
    </div>
  );
};

export default UserHome;
