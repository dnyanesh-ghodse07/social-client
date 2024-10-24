export interface Credentials {
  email: string;
  password: string;
  username?: string;
}

export interface QueryError {
  status: number;
  data: {
    message?: string;
  };
}

export interface Comment {
  _id: string;
  post_id: string;
  user_id: {
    _id: string;
    username: string;
  };
  text: string;
  parent_comment_id: string | null;
  createdAt: string;
  __v: number;
}

export interface User {
  _id: string;
  username: string;
  email?: string;
  profilePicture?: string;
  createdAt?: string;
}

export interface PostType {
  _id: string;
  text: string;
  likes_count: number;
  postImageUrl?: string;
  userHasLiked?: boolean;
  createdAt?: string,
  isSaved?: string,
  user: User; // Reference to the User type
}

export interface PostDetail {
  _id: string;
  text: string;
  likes_count: number;
  userHasLiked?: boolean;
  createdAt?: string,
  user: User;
}

