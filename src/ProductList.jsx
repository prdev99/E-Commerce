import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function ProductList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let result = await fetch('http://localhost:3001/products');
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      result = await result.json();
      setData(result);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.');
    }
  };

  const handleSearch = async (query) => {
    try {
      let endpoint = query ? `http://localhost:3001/search?query=${query}` : 'http://localhost:3001/products';
      let result = await fetch(endpoint);
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      result = await result.json();
      setData(result);
    } catch (error) {
      setError(error.message || 'An error occurred while searching.');
    }
  };

  const deleteOperation = async (id) => {
    try {
      let result = await fetch(`http://localhost:3001/products/${id}`, {
        method: 'DELETE'
      });
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      result = await result.json();
      fetchData();
    } catch (error) {
      setError(error.message || 'An error occurred while deleting the product.');
    }
  };

  if (error) {
    return (
      <>
        <h1>Error</h1>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      <h1>ProductList</h1>
      <SearchBar onSearch={handleSearch} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Price</th>
            <th>Image</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>{item.price}</td>
              <td><img src={item.file_url} width={100} height={100} alt="product" /></td>
              <td>
                <span onClick={() => deleteOperation(item.id)} className="btn btn-outline-dark">Delete</span>
                <Link to={`/update/${item.id}`}>
                  <span className="btn btn-outline-dark">Update</span>
                </Link>
                <Link to={`/show/${item.id}`}>
                  <span className="btn btn-outline-dark">Show</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ProductList;
