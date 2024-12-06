import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import SignUp from "./SignUp";
import Login from "./Login";
import Protected from "./Protected";
import Home from "./Home";
import ProductList from "./ProductList";
import ShowProduct from "./ShowProduct";
import UserProfile from "./UserProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path="/add" element={<Protected Cmp={AddProduct} />} />
          <Route
            path="/update/:id"
            element={<Protected Cmp={UpdateProduct} />}
          />
          <Route path="/show/:id" element={<Protected Cmp={ShowProduct} />} />
          <Route path="/user_profile" element={<UserProfile />} />
          <Route path="/sign_in" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/" element={<Protected Cmp={ProductList} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
