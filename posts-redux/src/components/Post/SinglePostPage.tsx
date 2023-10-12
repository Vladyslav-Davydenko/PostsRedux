import { useSelector } from "react-redux";
import { PostsType } from "../../helpers/posts/PostsType";
import PostAuthor from "./PostAuthor";
import PostDate from "./PostDate";
import PostReactions from "./PostReactions";
import { selectPostById } from "../../helpers/posts/PostsSlice";
import { useParams } from "react-router-dom";

export default function SinglePostPage() {
    const param = useParams()
    console.log(param.postID)
    const postID = param.postID ?? ""
    const post = useSelector((state: {posts: PostsType}) => selectPostById(state, postID))

    if(!post){
        return (
            <section>
                <h2>Page was not found</h2>
            </section>
        )
    }
    return (
        <article className="container">
            <div className="post-container">
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
        </article>
    )
}