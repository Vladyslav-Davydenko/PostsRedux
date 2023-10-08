import { useSelector } from "react-redux"
import { SelectAllPosts } from "../../helpers/posts/PostsSlice"
import { selectAllUsers } from "../../helpers/users/UsersSlice"

export default function Posts() {

    const users = useSelector(selectAllUsers)
    const posts = useSelector(SelectAllPosts)


    const listOfPosts = posts.map(post => {
        const author = users.find(user => user.id === post.userID)
        
        return(
            <div className="post-container" key={post.id}>
                <h3 className="post-title">
                {post.title}
                </h3>
                <p className="post-content">
                    {post.content}
                </p>
                <p className="post-author">
                    {author ? `By ${author.name}` : 'By Unknown'}
                </p>
                <div className="post-reaction">
                    <span>{`👍 ${post.reactions.thumbsUp}`}</span>
                    <span>{`😱 ${post.reactions.wow}`}</span>
                    <span>{`💜 ${post.reactions.heart}`}</span>
                    <span>{`🚀 ${post.reactions.rocket}`}</span>
                    <span>{`☕️ ${post.reactions.coffee}`}</span>
                </div>
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