export interface PostType {
  id: number;
  title: string;
  body: string;
  date: string;
  userId: number;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

export type Status = "idle" | "loading" | "succeeded" | "failed";
