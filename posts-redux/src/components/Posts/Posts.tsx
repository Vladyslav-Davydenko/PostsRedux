import { useSelector } from "react-redux"
import { SelectAllPosts } from "../../helpers/posts/PostsSlice"

export default function Posts() {

    const posts = useSelector(SelectAllPosts)

    const listOfPosts = posts.map(post => {
        return(
            <div className="post-container" key={post.id}>
                <h3 className="post-title">
                {post.title}
                </h3>
                <p className="post-content">
                    {post.content}
                </p>
                <p className="post-author">
                    By Unknown
                </p>
            </div>
        )
    })
    return (
        <div>
            <h2>Posts</h2>
            <div className="posts">
                {listOfPosts}
            </div>
        </div>
    )
}