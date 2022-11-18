import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./products.css";
// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function Products() {
  let [products, setProducts] = useState([]);

  /* Get All Product */
  const getAllProduct = () => {
    fetch(`http://localhost:9000/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  /* Delete Method */
  const deleteProduct = (id) => {
    if (id)
      MySwal.fire({
        title: `do you want to delete this product. ?`,
        showCancelButton: true,
      }).then((data) => {
        if (data.isConfirmed) {
          fetch(`http://localhost:9000/products/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((blob) => {
              getAllProduct();
            });
        }
      });
  };

  useEffect(() => {
    getAllProduct();
    deleteProduct();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <h1>Products List </h1>
        <p>Here is All the product List</p>

        <Link to={"add"} className="mr btn btn-success">
          Add New Product
        </Link>
        <Link to={"/category"} className="mr btn btn-secondary">
          Add New Categories
        </Link>

        <table className="table table-striped border mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>description</th>
              <th>Price</th>
              <th>Category</th>
              <th>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  Operations
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((info) => {
              return (
                <tr key={info.id}>
                  <th scope="row">{info.id}</th>
                  <td>
                    <strong>{info.title}</strong>
                  </td>
                  <td className="td-d">{info.description}...</td>
                  <td>
                    <strong>{info.price}$</strong>
                  </td>
                  <td className="text-center">{info.category}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Link to={`${info.id}`} className="btn btn-primary">
                        View
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteProduct(info.id);
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        to={`edit/${info.id}`}
                        className="btn btn-secondary"
                      >
                        Edit
                      </Link>
                    </div>
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

export { Products };
