import Footer from './component/Footer';
import Header from './component/Header';
import PrivateComponent from './component/PrivateComponent';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Signup from './component/Signup';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
 <Header/>
<Routes>

  <Route element={<PrivateComponent/>}>
  <Route path='/' element={<h1>this is a home page</h1>}/>
  <Route path='/add' element={<h1>this is a add page</h1>}/>
  <Route path='/update' element={<h1>this is a update page</h1>}/>
  <Route path='/logout' element={<h1>this is a logout page</h1>}/>
  <Route path='/profile' element={<h1>this is a profile page</h1>}/>
  </Route>

  <Route path='/signup' element={<Signup/>}/>
</Routes>
<Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;