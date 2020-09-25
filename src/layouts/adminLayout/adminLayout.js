import React from "react";
import { useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from "../../componentes/navbar/navbar";
import Sidebar from "../../componentes/sidebar/sidebar";
import ControlSidebar from "../../componentes/controlSidebar/controlSidebar";
import ScriptTag from 'react-script-tag';
import './adminltecss/fontawesome-free/css/all.min.css'
import './adminltecss/overlayScrollbars/css/OverlayScrollbars.min.css'
import './adminltecss/css/adminlte.min.css'
import Rutas from'../../rutas'
const AdminLayout = () => {

  useEffect(() => {
  
    return () => {
    }
  }, []);
 
  return (
    <>
        {/*<link rel="stylesheet" type="text/css" href="/dist/css/adminlte.min.css" />*/}

        <ScriptTag type="text/javascript" src="/plugins/jquery/jquery.min.js"/>
        <ScriptTag type="text/javascript" src="/plugins/bootstrap/js/bootstrap.bundle.min.js"/>
        <ScriptTag type="text/javascript" src="/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js" />
        <ScriptTag type="text/javascript" src="/dist/js/adminlte.js" />
        <ScriptTag type="text/javascript" src="/dist/js/demo.js"/>
        
        <ScriptTag type="text/javascript" src="/dist/js/pages/dashboard2.js"/>
        <Router>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <ControlSidebar></ControlSidebar>
          {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* /.content-header */}
        {/* Main content */}

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
              <Rutas></Rutas>
      </div>
            </div>
          </div>{/*/. container-fluid */}
        </section>
        {/* /.content */}
        {/* /.content-wrapper */}
      </div>

      </Router>
    </>
  );
};

export default AdminLayout;
