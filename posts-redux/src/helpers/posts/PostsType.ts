export interface PostType {
    id: string;
    title: string;
    body: string;
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

type status = 'idle' | 'loading' | 'succeeded' | 'failed'

export type PostsType = {
    posts: PostType[],
    status: status,
    error: null | string
}
