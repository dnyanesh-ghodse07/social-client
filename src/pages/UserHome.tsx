import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import {
  useCreatePostMutation,
  useGetAllPostsQuery,
} from "../features/posts/postsSlice";
import { Link } from "react-router-dom";
import { Post } from "../type";
import Loader from "../components/Loader";

const UserHome = () => {
  const [text, setText] = useState("");
  const { data: posts, isLoading, isError } = useGetAllPostsQuery({});
  const [createPost, { isLoading: createPostLoading }] =
    useCreatePostMutation();
  if (isLoading) return <Loader/>;
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
    <div className="p-10">
      <div className="py-2 border-b-2 mb-4">
        <h2 className="text-2xl  capitalize text-cyan-600">
          Welcome {posts?.posts?.[0]?.user?.username}
        </h2>
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
      <div className="flex flex-wrap gap-4">
        {posts?.posts?.map((post: Post) => (
            <div key={post._id} className="min-w-56 flex-1 p-2 shadow-md">
              <Link to={`/post/${post._id}`} >
                <p className="text-slate-400 flex items-center pb-1">
                  <CiUser size={20} />@{post?.user?.username}
                </p>
                <p className="max-h-24 no-scrollbar overflow-scroll text-slate-600">{post.text}</p>
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
        ))}
      </div>
    </div>
  );
};

export default UserHome;
