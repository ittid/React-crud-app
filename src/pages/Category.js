import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function Category() {
  let [BlockCategory, setBlockCategory] = useState();
  let [CategoryImages, setCategoryImages] = useState();
  let [categories, setCategories] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:9000/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: BlockCategory,
        image: CategoryImages,
      }),
    })
      .then((res) => res.json())
      .then((blob) => {
        console.log(blob);
        getAllCategories();
      });
  };

  /* get All categories */
  const getAllCategories = () => {
    fetch(`http://localhost:9000/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  /* delete Categories */
  const deleteCategory = (id) => {
    MySwal.fire({
      title: `do you want to delete this categorie. ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`http://localhost:9000/categories/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((blob) => {
            console.log(blob);
            getAllCategories();
          });
      }
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>Add New Categories</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Categories Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Categories Name"
              id="title"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setBlockCategory(e.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Categories Images</span>
            <input
              type="url"
              required
              id="image"
              className="form-control"
              placeholder="Categories images url"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setCategoryImages(e.target.value);
              }}
            />
            <span className="input-group-text" id="basic-addon2">
              exemple.com/image.png
            </span>
          </div>
          <button type="submit" className="btn btn-success">
            Add New Category
          </button>
        </form>
        <table className="table table-striped border mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Categories</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((elm) => {
              return (
                <tr key={elm.id}>
                  <th scope="row">{elm.id}</th>
                  <td>{elm.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteCategory(elm.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`${elm.id}`} className="btn btn-dark">
                      Edite categorie
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export { Category };
