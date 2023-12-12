import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

const PostDateComponent = (props: { date: string }) => {
  const date = props.date;
  let timeAgo = "";
  if (date) {
    const timeStamp = parseISO(date);
    timeAgo = `${formatDistanceToNow(timeStamp)} ago`;
  }
  return (
    <span title={date} className="post-time">
      <i>{timeAgo}</i>
    </span>
  );
};

const PostDate = React.memo(PostDateComponent);
export default PostDate;
