import { useState } from "react";
import {
  useCreatePostMutation,
  useGetUserPostQuery,
} from "../features/posts/postsSlice";
import Loader from "../components/Loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { PostType } from "../type";
import PostUser from "../components/PostUser";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";


const UserHome = () => {
  const [text, setText] = useState("");
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  const { data: posts, isLoading, isError, error } = useGetUserPostQuery(currentUserId);
  const [createPost, { isLoading: createPostLoading }] =
    useCreatePostMutation();

  //navigate to login if token expired
  if (error && "status" in error) {
    const fetchError = error as FetchBaseQueryError;
    if (fetchError.status === 401) {
      localStorage.removeItem("token");
      // navigate("/login");
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

  return (
    <div className="p-4">
      <div className="py-2 border-b-2 mb-4">
        <h2 className="text-2xl capitalize text-cyan-600">Welcome</h2>
        <div className="my-2 w-full h-36 flex flex-col items-end">
          <textarea
            value={text}
            placeholder="What’s on your mind ?"
            onChange={(e) => setText(e.target.value)}
            className="border-[1px] w-full flex-1 mb-2 outline-none p-2 rounded-md shadow-inner"
          />
          <Button
            color="primary"
            variant="solid"
            // className="bg-slate-700 text-slate-100 w-fit py-1 px-6"
            onClick={handleSubmit}
            disabled={createPostLoading}
          >
            {createPostLoading ? "Loading..." : "Post"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {posts?.posts?.map((post: PostType) => {
          return <PostUser key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default UserHome;
