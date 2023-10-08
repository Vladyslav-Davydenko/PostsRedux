import { useSelector } from "react-redux"
import { selectAllUsers } from "../../helpers/users/UsersSlice"

export default function PostAuthor(props: {userID: string}) {
    const users = useSelector(selectAllUsers)
    const author = users.find(user => user.id === Number.parseInt(props.userID, 10))
    
    return(
        <p className="post-author">
            {author ? `By ${author.name}` : 'By Unknown'}
        </p>
    )
}