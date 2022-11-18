import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  /* get Inputs value onChange */
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("");
  let [images, setImages] = useState("");
  let [price, setPrice] = useState(0);
  let [count, setCount] = useState(1);

  /* implement redirect using navigate */
  let navigate = useNavigate();

  // prevent Sebmiting the form
  const formSubmit = (event) => {
    event.preventDefault();
    // AJAX request
    fetch(`http://localhost:9000/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        description,
        category,
        images,
        rate: 0,
        count,
      }),
    })
      .then((res) => res.json())
      .then((blob) => {
        console.log(blob);
        navigate("/products");
      });
  };

  /* get All categories */
  let [cat, setCat] = useState([]);

  const getAllCategories = () => {
    fetch(`http://localhost:9000/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCat(data);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>Add New Product</h1>
        <form onSubmit={formSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Product title
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div id="emailHelp" className="form-text">
              please set a good title that can make people interesing on it.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Product description
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="description"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <div id="emailHelp" className="form-text">
              make it clear and full of the important details
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="select"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {cat.map((opt) => {
                return (
                  <>
                    <option keys={opt.name} value={opt.name}>
                      {opt.name}
                    </option>
                  </>
                );
              })}
            </select>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Price $</span>
            <input
              type="number"
              required
              id="price"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              onChange={(e) => {
                setPrice(+e.target.value);
              }}
            />
            <span className="input-group-text">.00</span>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Product Quantité (Count)
            </label>
            <input
              type="number"
              required
              className="form-control"
              id="number"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setCount(+e.target.value);
              }}
            />
            <div id="emailHelp" className="form-text">
              How Match do you have in your Stock
            </div>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Images</span>
            <input
              type="url"
              required
              id="image"
              className="form-control"
              placeholder="images url"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setImages(e.target.value);
              }}
            />
            <span className="input-group-text" id="basic-addon2">
              @example.com
            </span>
          </div>

          <button type="submit" className="btn btn-success">
            Submit New Product
          </button>
        </form>
      </div>
    </>
  );
}

export { Add };
