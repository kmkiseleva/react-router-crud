import { NavLink } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <nav className="navbar bg-warning mb-5">
        <div className="container d-flex justify-content-around">
          <NavLink className="navbar-brand" activeClassName="active" to="/">
            Posts
          </NavLink>
          <NavLink
            className="navbar-brand"
            activeClassName="active"
            to="/posts/new"
          >
            Add New Post
          </NavLink>
        </div>
      </nav>
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
