import { useState } from "react";
import Header from "./Header";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function login(){
    let item = {
      user: {
        email: email,
        password: password
      }
    };

    let result = await fetch(`http://localhost:3001/login`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
    })
    result = await result.json();
    localStorage.setItem('user-info', JSON.stringify(result))
    navigate('/add')
    console.log(result);
  }
  return(
    <>
      <div className="col-sm-2 offset-sm-5">
        <h1>Login Page</h1>
        <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control"/><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control"/><br/>
        <Button onClick={login}>Login</Button>
      </div>
    </>
  )
}

export default Login;
