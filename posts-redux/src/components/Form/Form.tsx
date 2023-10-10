import { useState, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllUsers } from "../../helpers/users/UsersSlice"
import { addPost } from "../../helpers/posts/PostsSlice"
import { Status } from "../../helpers/posts/PostsType"
import { AppDispatch } from "../../helpers/store"

export default function Form(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState<Status>("idle")
    const dispatch: AppDispatch = useDispatch()

    const users = useSelector(selectAllUsers)

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
    const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

    const usersOptions = users.map(user => {
        return (
            <option key={user.id} value={user.id}>{user.name}</option>
        )
    })

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle"

    function onSavePostClicked(){
        if (canSave){
            try{
                setAddRequestStatus("loading")
                const body = content
                dispatch(addPost({title, body, userId})).unwrap()

                setTitle("")
                setContent("")
                setUserId("")
            } catch(err: any){
                console.error("Failed to save the post", err)
            } finally {
                setAddRequestStatus("idle")
            }
        }
    }

    return (
        <section className="posts-form">
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}