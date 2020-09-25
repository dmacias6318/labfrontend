import React from 'react'
const Navbar =()=>{
    return(
            
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="/#"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>
          {/* SEARCH FORM */}
       
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Messages Dropdown Menu */}
            <li>
              <button onClick={()=>{localStorage.clear(); window.location="/"}}>Salir</button>
            </li>
        
          </ul>
        </nav>
        
    )
}

export default Navbar