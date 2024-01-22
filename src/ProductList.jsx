import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Header from "./Header";

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

  if (error) {
    return (
      <>
        <h1>Error</h1>
        <p>{error}</p>
      </>
    );
  }

  async function deleteOperation(id){
    let result = await fetch('http://localhost:3001/products/'+id, {
      method: 'DELETE'
    })
    result = await result.json()
    fetchData();
  }

  return (
    <>
      <h1>ProductList</h1>
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
          {
            data.map((item) =>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>{item.price}</td>
              <td><img src={item.file_url} width={100} height={100}/></td>
              <td><span onClick={() => {deleteOperation(item.id)}} className="delete">Delete</span></td>
            </tr>
            )
          }
        </tbody>
      </Table>
    </>
  );
}

export default ProductList;
