import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const ShowProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    body: "",
    price: 0,
    file: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      let result = await fetch(`http://localhost:3001/products/${id}`);
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      result = await result.json();
      setProduct(result);
    } catch (error) {
      setError(error.message || "An error occurred while fetching data.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "50rem" }}>
          <img
            src={product.file_url}
            height={400}
            className="card-img-top"
            alt="product"
          />
          <div className="card-body">
            <h5 className="card-title">Title: {product.title}</h5>
            <p className="card-text">Decription: {product.body}</p>
            <span>price:{product.price}</span>
          </div>
          <Link to={`/`}>
            <span className="show">Back</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
