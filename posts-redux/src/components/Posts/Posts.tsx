import { useDispatch, useSelector } from "react-redux"
import { selectAllPosts, selectError, selectStatus } from "../../helpers/posts/PostsSlice"
import { fetchPosts } from "../../helpers/posts/PostsSlice"
import { useEffect } from "react"
import Post from "../Post/Post"
import { AppDispatch } from "../../helpers/store"
import Loader from "../UI/Loader/Loader"

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

    let content;

    if(status === 'loading'){
        content = <Loader />
    } else if(status === 'succeeded'){
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => {
            return(
                <Post post={post} key={post.id}/>
            )
        })
    } else if(status === 'failed'){
        content = <p>{error}</p>
    }

    return (
        <div>
            <h2>Posts</h2>
            <div className="posts">
                {content}
            </div>
        </div>
    )
}