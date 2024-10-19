import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import {
  useDislikePostMutation,
  useLikePostMutation,
} from "../features/posts/postsSlice";
import useNavigateToLogin from "../hooks/useNavigateToLogin";

const Like = ({ postId, isLiked }: {postId: string, isLiked: boolean}) => {
  const [likePost, { isLoading: likeLoading }] = useLikePostMutation();
  const [dislikePost, { isLoading: dislikeLoading }] = useDislikePostMutation();
  const checkLogin = useNavigateToLogin();

  const handleLikeDislike = async () => {
    checkLogin();
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <>
      {isLiked ? (
        <button onClick={handleLikeDislike} disabled={dislikeLoading}>
          <IoMdHeart size={24} />
        </button>
      ) : (
        <button onClick={handleLikeDislike} disabled={likeLoading}>
          <IoMdHeartEmpty size={24} />
        </button>
      )}
    </>
  );
};

export default Like;
