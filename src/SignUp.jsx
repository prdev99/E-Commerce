import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const SignUp = () => {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm_pass, setConfirmPass] = useState("");
  const [full_name, setFullName] = useState("");
  const navigate = useNavigate();

  async function singUp() {
    let item = {
      user: {
        email: email,
        full_name: full_name,
        password: pass,
        password_confirmation: confirm_pass,
      },
    };

    console.log(item, "item");

    let result = await fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    console.log(result, "signup");
    localStorage.setItem("user-info", JSON.stringify(result));
    {
      navigate("/add");
    }
  }

  return (
    <>
      <div className="col-sm-2 offset-sm-5">
        <h1>SignUp Page</h1>
        <input
          type="text"
          placeholder="Full Name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm_pass}
          onChange={(e) => setConfirmPass(e.target.value)}
          className="form-control"
        />
        <br />
        <Button onClick={singUp}>SignUp</Button>
      </div>
    </>
  );
};

export default SignUp;
