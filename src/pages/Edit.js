import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  let { editId } = useParams();
  let [categories, setCategories] = useState([]);
  let [editedProduct, setEditedProduct] = useState([]);
  /* get Inputs value onChange */
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("");
  let [images, setImages] = useState("");
  let [price, setPrice] = useState(0);
  let [count, setCount] = useState(1);
  /* use Navigate */
  let navigate = useNavigate();

  const handleEdite = (event) => {
    event.preventDefault();
    fetch(`http://localhost:9000/products/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        description,
        category,
        images,
        rate: editedProduct.rate && 0,
        count,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        navigate("/products");
      });
  };

  useEffect(() => {
    /* get categories and set categories on <option> */
    fetch(`http://localhost:9000/categories`)
      .then((res) => res.json())
      .then((blob) => {
        setCategories(blob);
      });

    /* Get All Product */
    fetch(`http://localhost:9000/products/${editId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.title);
        setEditedProduct(data);
      });
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>Edit Product</h1>
        <form onSubmit={handleEdite}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Product title
            </label>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              defaultValue={editedProduct.title}
              type="text"
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Product description
            </label>
            <input
              defaultValue={editedProduct.description}
              type="text"
              required
              className="form-control"
              id="description"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
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
              {categories.map((opt) => {
                return (
                  <>
                    <option key={opt.name} value={opt.name}>
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
              defaultValue={editedProduct.price}
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
              defaultValue={editedProduct.count}
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
              defaultValue={editedProduct.images}
              type="url"
              required
              id="image"
              className="form-control"
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

          <button type="submit" className="btn btn-warning">
            Save Your Product
          </button>
        </form>
      </div>
    </>
  );
}

export { Edit };
