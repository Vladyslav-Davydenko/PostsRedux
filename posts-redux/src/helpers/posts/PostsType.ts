export interface PostType {
    id: string;
    title: string;
    content: string;
    date: string;
    userID: string;
    reactions: {
      thumbsUp: number;
      wow: number;
      heart: number;
      rocket: number;
      coffee: number;
    };
}

export type PostsType = {
    posts:PostType[]
}
