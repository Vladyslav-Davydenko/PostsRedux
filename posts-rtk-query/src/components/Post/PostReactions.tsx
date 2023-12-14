import { PostType } from "../../helpers/posts/PostsType";
import { useAddReactionMutation } from "../../helpers/posts/PostsSlice";

const reactions = {
  thumbsUp: "👍",
  wow: "😱",
  heart: "💜",
  rocket: "🚀",
  coffee: "☕️ ",
};

export type ReactionType = keyof typeof reactions;

export default function PostReactions(props: { post: PostType }) {
  const post = props.post;
  const [addReaction] = useAddReactionMutation();
  const postID = post.id;

  const postReactions = Object.entries(reactions).map(([reaction, value]) => {
    return (
      <button
        key={reaction}
        type="button"
        onClick={() => {
          const newValue =
            (post.reactions[reaction as keyof typeof reactions] as number) + 1;
          addReaction({
            postID,
            reactions: {
              ...post.reactions,
              [reaction as keyof typeof reactions]: newValue,
            },
          });
        }}
      >
        {`${value} ${post.reactions[reaction as ReactionType]}`}
      </button>
    );
  });
  return <div className="post-reaction">{postReactions}</div>;
}
