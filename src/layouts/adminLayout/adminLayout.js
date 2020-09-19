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
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Dashboard v2</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard v2</li>

                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
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
