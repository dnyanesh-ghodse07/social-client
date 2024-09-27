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

export interface Post {
  _id: string;
  text: string;
  likes_count: 0;
  user: {
    username: string;
  };
}
