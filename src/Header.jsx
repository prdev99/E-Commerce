import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-info"));
  function logout() {
    localStorage.clear();
    navigate("/sign_in");
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">E Commerce App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {localStorage.getItem("user-info") ? (
              <>
                <Nav className="me-auto nav-bar-wrapper">
                  <Link to="/">Product List</Link>
                  <Link to="/add">Add Product</Link>
                  <Link to="/update">Update Product</Link>
                  {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
              </>
            ) : (
              <>
                <Nav className="nav-bar-wrapper">
                  <Link to="/sign_in">Login</Link>
                  <Link to="/sign_up">SignUp</Link>
                </Nav>
              </>
            )}
            {localStorage.getItem("user-info") ? (
              <Nav>
                <NavDropdown title={user && user.email}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
