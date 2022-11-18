import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function View() {
  let [viewed, setViewed] = useState([]);

  let { productId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setViewed(data);
      });
  }, []);

  return (
    <>
      {viewed && (
        <div className="card mb-3 m-5">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={viewed.images}
                className="img-fluid rounded-start"
                alt={viewed.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{viewed.title}</h5>
                <p className="card-text">{viewed.description}</p>
                <p className="card-text">
                  <small className="text-muted">{viewed.category}</small>
                  <small className="text-muted p-3">⭐ {viewed.rate}</small>
                </p>
                <p className="text-danger">
                  <strong>{viewed.count}</strong> in stock!
                </p>
                <a href="#buy" className="btn btn-warning">
                  {viewed.price}$
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { View };
