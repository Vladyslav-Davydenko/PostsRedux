import { selectAllUsers } from "../../helpers/users/UsersSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Users() {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => {
    return (
      <div className="container" key={user.id}>
        <Link to={`/user/${user.id}`}>
          <div className="user">
            <svg
              width="100px"
              height="100px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="#839b6f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>{user.name}</p>
          </div>
        </Link>
      </div>
    );
  });
  return <section className="users">{renderedUsers}</section>;
}
