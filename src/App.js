import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css';


function App() {
   return (
      <div className = "App">
         <BrowserRouter>
            <Routes>
               <Route exact path="/login" element={<Login />} />
               <Route exact path="/register" element={<Signup />} />
               <Route path='/' element={<ProtectedRoute />}>
                 <Route path='/' element={<Home />}/>
               </Route>
               <Route path="*" element={<NotFound />} />
            </Routes>
         </BrowserRouter>
      </div>
      
   );
}

export default App;