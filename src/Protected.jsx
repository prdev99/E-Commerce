import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let Cmp = props.Cmp
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('user-info'))
    {
      navigate('/sign_in')
    }
  }, [])
  return(
    <> 
      <Cmp/>
    </>
  )
}

export default Login;
