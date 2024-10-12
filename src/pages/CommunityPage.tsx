import { PostType, User } from "../type";
import { useGetAllPostsQuery } from "../features/posts/postsSlice";
import Loader from "../components/Loader";
import Post from "../components/PostPublic";
import { useLazyGetSearchResultQuery } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);
  const { data: posts, isLoading, isError } = useGetAllPostsQuery({});
  const [triggerSearch, { data: searchResult, isLoading: isSearchLoading }] =
    useLazyGetSearchResultQuery();

  useEffect(() => {
    if (!searchTerm) return;
    let timerId;
    // eslint-disable-next-line prefer-const
    timerId = setTimeout(() => {
      triggerSearch(searchTerm);
    }, 500);

    return () => clearInterval(timerId);
  }, [searchTerm, triggerSearch, focused]);

  const handleBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 100);
  };
  console.log(searchResult);

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className="p-4 text-center">
        <p className="text-red-300 text-xl">Something went wrong !</p>
      </div>
    );
  return (
    <div className="p-4">
      <div className="w-full relative">
        <input
          className="p-2 border w-full outline-none"
          type="text"
          placeholder="Search users"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        />
        {focused && searchTerm && (
          <div className="max-h-56 overflow-auto flex flex-col gap-2 absolute shadow-md rounded-b-md bg-slate-200 p-1 w-full">
            {isSearchLoading && <Loader />}
            {searchResult?.length == 0 ? (
              <div className="text-amber-900">
                {searchTerm ? `'${searchTerm}' Not found` : "Search user !"}
              </div>
            ) : (
              searchResult?.map((user: User) => {
                return (
                  <Link key={user._id} to={`/user/profile/${user._id}`}>
                    <div className="bg-white p-1 rounded-md">
                      <span className="text-slate-500">{user.username}</span>
                      <p>{user.email}</p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </div>
      <h1 className="my-4 text-xl">Community</h1>
      <div className="flex flex-col gap-4">
        {posts?.posts?.map((post: PostType) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
