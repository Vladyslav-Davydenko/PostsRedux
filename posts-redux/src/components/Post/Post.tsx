import { PostType } from "../../helpers/posts/PostsType"
import PostAuthor from "./PostAuthor"
import PostReactions from "./PostReactions"
import PostDate from "./PostDate"

export default function Post(props: {post: PostType}) {
    const { post } = props
    
    return (
        <div className="post-container" key={post.id}>
            <h3 className="post-title">
            {post.title}
            </h3>
            <p className="post-content">
                {post.body.substring(0, 100)}
            </p>
            <PostAuthor userID={post.userId}/>
            <PostReactions post={post} />
            <PostDate date={post.date}/>
        </div>
    )
}