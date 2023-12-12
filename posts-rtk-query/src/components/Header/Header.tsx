import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="navigation">
        <h1 className="nav-title">Posts Redux</h1>
        <ul className="links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Posts
          </NavLink>
          <NavLink
            to="/post"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Form
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Users
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
