import Footer from './component/Footer';
import Header from './component/Header';
import PrivateComponent from './component/PrivateComponent';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import AddFoodItem from './component/AddFoodItem';
import FoodItemList from './component/FoodItemList';
import UpdateFoodItem from './component/UpdateFoodItem';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
 <Header/>
<Routes>

  <Route element={<PrivateComponent/>}>
  <Route path='/' element={<FoodItemList/>}/>
  <Route path='/add' element={<AddFoodItem/>}/>
  <Route path='/update/:id' element={<UpdateFoodItem/>}/>
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