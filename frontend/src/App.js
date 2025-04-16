import Footer from './component/Footer';
import Header from './component/Header';
import PrivateComponent from './component/PrivateComponent';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
 <Header/>
<Routes>

  <Route element={<PrivateComponent/>}>
  <Route path='/' element={<ProductList/>}/>
  <Route path='/add' element={<AddProduct/>}/>
  <Route path='/update' element={<UpdateProduct/>}/>
  <Route path='/logout' element={<h1>this is a logout page</h1>}/>
  <Route path='/profile' element={<h1>this is a profile page</h1>}/>
  </Route>

  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>
<Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;