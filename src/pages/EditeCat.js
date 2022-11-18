import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditeCat() {
  let { categorEditId } = useParams();
  let [catEdite, setCatEdite] = useState([]);

  let navigate = useNavigate();

  let [name, setName] = useState("");
  let [image, setImage] = useState("");

  const handleEditeCat = (event) => {
    event.preventDefault();

    fetch(`http://localhost:9000/categories/${categorEditId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
      }),
    })
      .then((res) => res.json())
      .then((blob) => {
        console.log(blob);
        navigate("/category");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:9000/categories/${categorEditId}`)
      .then((res) => res.json())
      .then((blob) => {
        console.log(blob);
        setCatEdite(blob);
      });
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h3>Edite Categories {catEdite.name} </h3>
        <form onSubmit={handleEditeCat}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Name
            </label>
            <input
              defaultValue={catEdite.name}
              type="text"
              required
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Image (categories image)
            </label>
            <input
              defaultValue={catEdite.image}
              type="url"
              required
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Save Categories
          </button>
        </form>
      </div>
    </>
  );
}

export { EditeCat };
