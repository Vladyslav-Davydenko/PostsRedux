import { useSelector } from "react-redux"
import { SelectAllPosts } from "../../helpers/posts/PostsSlice"
import Post from "../Post/Post"

export default function Posts() {
    const posts = useSelector(SelectAllPosts)


    const listOfPosts = posts.map(post => {
        return(
            <Post post={post} key={post.id}/>
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