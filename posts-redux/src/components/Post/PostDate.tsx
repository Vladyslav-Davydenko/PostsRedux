import { formatDistanceToNow, parseISO } from "date-fns"

export default function PostDate(props: {date: string}) {
    const date = props.date
    let timeAgo = ''
    if(date){
        const timeStamp = parseISO(date)
        timeAgo = `${formatDistanceToNow(timeStamp)} ago`
    }
    return (
        <span title={date} className="post-time">
            <i>{timeAgo}</i>
        </span>
    )
}