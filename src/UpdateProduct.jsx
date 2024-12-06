import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UpdateProduct() {
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

  const updateProduct = () => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        if (!result.ok) {
          console.log(result);
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        return result.json();
      })
      .then((response) => {
        // Product updated successfully
        navigate("/");
      })
      .catch((error) => {
        setError(
          error.message || "An error occurred while updating the product."
        );
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <>
      <div className="col-sm-6 offset-sm-3">
        <h1>Update Product</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <form>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              className="form-control"
            />
            <br />

            <label>Body:</label>
            <textarea
              name="body"
              value={product.body}
              onChange={handleInputChange}
              className="form-control"
            />
            <br />

            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="form-control"
            />
            <br />

            <label>Image URL:</label>
            <input
              type="file"
              name="file"
              onChange={handleInputChange}
              className="form-control"
            />
            <br />
            <Button onClick={updateProduct}>Update Product</Button><br/><br/>
            <Link to={"/"}>
              <Button>Back</Button>
            </Link>
          </form>
        )}
      </div>
    </>
  );
}

export default UpdateProduct;
