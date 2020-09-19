import React from "react";
import "./App.css";
//import AdminLayout from './layouts/adminLayout/adminLayout'
import Admin from './layouts/adminLayout/adminLayout'
import Login from './layouts/login/login'

function App() {
  return (
    <>
    {
      localStorage.getItem("token")?  <Admin/> :  <Login/>
    }
   </>

  );
}

export default App;
