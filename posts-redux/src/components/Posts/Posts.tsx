import { useDispatch, useSelector } from "react-redux"
import { selectAllPosts, selectError, selectStatus } from "../../helpers/posts/PostsSlice"
import { fetchPosts } from "../../helpers/posts/PostsSlice"
import { useEffect } from "react"
import Post from "../Post/Post"
import { AppDispatch } from "../../helpers/store"

export default function Posts() {
    const dispatch: AppDispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const status = useSelector(selectStatus)
    const error = useSelector(selectError)

    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchPosts())
        }
    }, [dispatch, status])

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const listOfPosts = orderedPosts.map(post => {
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