export interface PostType {
  id: string;
  title: string;
  body: string;
  date: string;
  userId: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type PostsType = {
  posts: PostType[];
  status: Status;
  error: null | string;
};
