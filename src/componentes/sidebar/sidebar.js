import React, { useState,useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios' 
import  {Link} from 'react-router-dom'
import {url} from '../../url'


const Sidebar = () => {



  const [stateModal, setStateModal] = useState({
    modal: false
  })

  const [state,setState]=useState({
    nombre:"",
    listLab:[]
  })

  const onchange=(e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }

useEffect((e)=>{
  listarLabFn()
},[])

  const crearLab=async (e)=>{
    e.preventDefault()
    if(state.nombre===""){
      alert("se debe ingresar el nombre del laboratorio ")
    }else{
      try{
       const res = await Axios.post(`${url}/createLabr`,state)
       if(res.data==="ok"){
         alert(res.data.mensaje)
         listarLabFn()
       }else{
         alert(res.data.mensaje)
       }
      }catch(e){
        console.log(e)
      }
    }
  }


  const listarLabFn =async()=>{
    try{
     const res= await Axios.get(`${url}/alldataLabr`)
     setState({
       ...state,
       listLab:res.data.resultado}
       )
    }catch(e){
      console.log(e)
    }
  }



  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {localStorage.getItem("nombres")}
              </a>
            </div>
          </div>


          {/* Sidebar Menu */}
          <nav className="mt-2">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-10">
                  <label style={{ width: "100%" ,color:"white"}}>Nuevo laboratorio</label>
                </div>
                <div className="col-md-2">
                  <button onClick={()=>setStateModal({...stateModal,modal:true})}><i className="fa fa-plus" style={{color:"green",fontSize:"15px"}}></i></button>
                </div>
              </div>
            </div>
            <br />
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
              <li className="nav-item has-treeview menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Laboratorios
                  <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
             {  
               state.listLab.length>0?
               (
                state.listLab.map((data,index)=>(
                  <li className="nav-item" key={index} >
                  <Link to={"/equipos/"+data.laboratorioid} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>{data.nombre}</p>
                  </Link>
                </li>
                ))
               )
               :
              <div className="col-md-12">
                <div className="row">
                  <label style={{textAlign:"center",width:"100%",padding:"12px",color:"white"}}>"No existen laboratorios"</label>
                  
                </div>
              </div>
              
             }
                </ul>
              </li>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>



      {/* MODAL INFO DE CAUSAS*/}
      <Modal isOpen={stateModal.modal} toggle={() => {
        setStateModal({
          ...stateModal,
          modal: false
        })
      }}
        style={{ maxWidth: "30%", padding: "20px" }}
      >
        <ModalHeader toggle={() => {
          setStateModal({
            ...stateModal,
            modal: false
          })
        }
        }
          style={{ background: "black", color: "white" }}>NUEVO LABORATORIO</ModalHeader>
        <ModalBody>
          <div className="col-md-12">
             <div className="row">
                 <label style={{width:"100%"}} >Ingrese el nombre :</label>
                 <input style={{width:"100%"}} type="text" name="nombre" onChange={onchange} value={state.nombre}></input>
             </div>
          </div>
        </ModalBody>
        <ModalFooter>
                  
                  <Button color="secondary" onClick={(e) => {
                      setStateModal({
                          ...stateModal,
                          modal: false
                      })
                  }}>Cancelar</Button>
                  <Button onClick={crearLab} color="primary" >Crear</Button>{' '}
              </ModalFooter>
      </Modal>
      {/* FIN MODAL INFO DE USUARIOS*/}
    </div>
  );
};

export default Sidebar