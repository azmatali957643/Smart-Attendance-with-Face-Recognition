
import Nav from "./Component/Nav"
import Main from "./Component/Main"
import Footer from "./Component/Footer"
import Admin from "./Pages/Admin";
import EnrollUser from "./Pages/EnrollUser";

import MarkAttendance from "./Pages/MarkAttendance";
import PrivateRoute from "./Pages/PrivateRouter";
import Dashboard from "./Pages/Dashboard";
import { useState } from "react";
import {  Routes, Route } from "react-router-dom";
function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("app me ",isLoggedIn)
  return (
      
      
        <>
        
            <Nav></Nav>
            <Routes>

          < Route path="*" element={<div> 404 Page Not Found</div>}> </Route>
           < Route path="/" element={<Main></Main>}> </Route>
           < Route path="/enrolluser" element={<EnrollUser></EnrollUser>}> </Route>
           < Route path="/markattendance" element={<MarkAttendance></MarkAttendance>}> </Route>
           < Route path="/admin" element={<Admin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} ></Admin>}> </Route>
    
           
            <Route path="/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn} > <Dashboard></Dashboard> </PrivateRoute>}></Route>

            </Routes>
           <Footer></Footer>
        </>
        
        
       
    
  )
}

export default App
