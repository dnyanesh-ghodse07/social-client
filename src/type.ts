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

interface User {
  _id: string;
  username: string;
}

export interface Post {
  _id: string;
  text: string;
  likes_count: number;
  userHasLiked?: boolean;
  createdAt?: string,
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
