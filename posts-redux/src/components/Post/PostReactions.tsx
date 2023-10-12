import { useDispatch } from "react-redux";
import { PostType } from "../../helpers/posts/PostsType";
import { addReaction } from "../../helpers/posts/PostsSlice";

const reactions = {
  thumbsUp: "👍",
  wow: "😱",
  heart: "💜",
  rocket: "🚀",
  coffee: "☕️ ",
};

export type ReactionType = keyof typeof reactions;

export default function PostReactions(props: { post: PostType }) {
  const dispatch = useDispatch();
  const post = props.post;
  const postID = post.id;

  const postReactions = Object.entries(reactions).map(([reaction, value]) => {
    return (
      <button
        key={reaction}
        type="button"
        onClick={() => dispatch(addReaction({ postID, reaction }))}
      >
        {`${value} ${post.reactions[reaction as ReactionType]}`}
      </button>
    );
  });
  return <div className="post-reaction">{postReactions}</div>;
}
