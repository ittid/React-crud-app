import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container mt-5">
        <main className="mb-5">
          <h1 className="text-center mb-4">
            Hi, 👋 welcome to React{" "}
            <abbr title="Create Read Update Delete">CRUP</abbr> operation app.
          </h1>
          <p className="fw-bold text-center">
            Release by:
            <a
              href="https://www.github.com/ittid"
              target={"__blank"}
              className="p-1 link"
            >
              @ittid,
            </a>
            a JavaScript Developer
          </p>
        </main>
        <div className="mt-4 text-center">
          <h2>
            Have a chance to check our application and make your CRUD operation{" "}
          </h2>
          <div>
            <Link
              to={"/products"}
              type="button"
              className="m-3 btn btn-primary "
            >
              Products List
            </Link>
            <Link
              to={"/products/add"}
              type="button"
              className="m-3 btn btn-success"
            >
              Add Products
            </Link>
            <Link
              to={"/category"}
              type="button"
              className="m-3 btn btn-warning"
            >
              Add New Categories
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export { Home };
