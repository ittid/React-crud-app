import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <h5>Hi, anonymos.</h5>
      <p>
        Welcome to your
        <abbr title="Create Read Update Delete">
          <strong>CRUD</strong>
        </abbr>
        application.
      </p>

      <ul className="list-group">
        <li className="list-group-item">
          <Link to={"/home"}>Home Page</Link>
        </li>
        <li className="list-group-item">
          <Link to={"/products"}>Products</Link>
        </li>
        <li className="list-group-item">
          <Link to={"/products/add"}>Add Products</Link>
        </li>
        <li className="list-group-item">
          <Link to={"/category"}>Category</Link>
        </li>
      </ul>

      <p className="copyright">
        copyright©{" "}
        <a href="https://www.github.com/ittid" target="_blank" rel="noreferrer">
          ittid
        </a>
      </p>
    </>
  );
}

export default Sidebar;
