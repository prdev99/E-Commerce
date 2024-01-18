import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import SignUp from './SignUp';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/add' element = {<AddProduct/>}/>
          <Route path='/update' element = {<UpdateProduct/>}/>
          <Route path='/sign_in' element = {<Login/>}/>
          <Route path='/sign_up' element = {<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
