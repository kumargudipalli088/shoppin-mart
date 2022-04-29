// import { Button } from 'antd';

import 'antd/dist/antd.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Bills from './pages/Bills';
import CartPage from './pages/CartPage';
import Customers from './pages/Customers';
import HomePage from './pages/Homepage';
import Items from './pages/Items';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/home" element={<HomePage />} />
          <Route path="/items" element={<Items />} />
          <Route path="/cart" element={<CartPage />} />
           <Route path="/bills" element={<Bills />} /> 
           <Route path="/customers" element={<Customers  />} /> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Signin />} />
        </Routes>
    </BrowserRouter>
  
    </div>
  );
}

export default App;


// export function ProtectedRoute({children}){

//   if(localStorage.getItem('postUser'))
//   {
//     return children
//   }
//   else{
//     return <Navigate to='/signin' />
//   }

// }