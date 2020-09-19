import React from "react";
import { useEffect } from 'react';
import Navbar from "../../componentes/navbar/navbar";
import Sidebar from "../../componentes/sidebar/sidebar";
import ControlSidebar from "../../componentes/controlSidebar/controlSidebar";
import ScriptTag from 'react-script-tag';
import './adminltecss/fontawesome-free/css/all.min.css'
import './adminltecss/overlayScrollbars/css/OverlayScrollbars.min.css'
import './adminltecss/css/adminlte.min.css'

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

        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <ControlSidebar></ControlSidebar>

    </>
  );
};

export default AdminLayout;
