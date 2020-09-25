import React, { useEffect, useState, useContext } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios'
import { url } from '../../url'
import './stye.css'

//MONCA

const Equipos = (props) => {

    const { match } = props
    const { params } = match


    const [stateModal, setStateModal] = useState({
        nuevoSoftware: false,
        nuevoHardware: false,
        nuevoEquipoModal: false,
        infoModal: false,
        causa_id: ""

    })

    const [state, setState] = useState({
        todos: [],
        todosHard:[],
        todosSoft:[],
        currentPage: 1,
        todosPerPage: 10,
        modalinfo: false,
        modaldata: {},
        search: "",
        infoCausa: {}
    })

    const [data, setData] = useState({
        numeropc: "",
        tipo: "",
        marca: "",
        fecha_adquisicion: "",
        serie: "",
        laboratorioid: params.labid
    })

    const [datah, setDatah] = useState({
        nombre: "",
        detalle: "",
        equipoid: ""
    })

    const [datas, setDatas] = useState({
        categoria: "",
        nombre: "",
        version: "",
        licencia: "",
        equipid: ""
    })

    const { todos, currentPage, todosPerPage } = state;


    const handleClick = (event) => {
        setState({
            ...state,
            currentPage: Number(event.target.id)
        });
    }

    const onchange = (e) => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    const onchangedata = (e) => {
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onchangedatah = (e) => {
        e.preventDefault()
        setDatah({
            ...datah,
            [e.target.name]: e.target.value
        })
    }

    const onchangedatas = (e) => {
        e.preventDefault()
        setDatas({
            ...datas,
            [e.target.name]: e.target.value
        })
    }



    const abrirMovimientos = (dato, e) => {
        e.preventDefault()
        setStateModal({
            ...state,
            nuevoHardware: true,
            causa_id: dato.llc_causa_inicial_id
        })
    }

    const infoCausa = (data, e) => {
        e.preventDefault()
        setStateModal({
            ...state,
            infoModal: true
        })
        setState({
            ...state,
            infoCausa: data
        })

        allEquiposHard(data.equipoid)
        allEquiposSof(data.equipoid)
    }


    const editCausa = (data, e) => {
        e.preventDefault()
        setStateModal({
            ...state,
            nuevoEquipoModal: true
        })
        setState({
            ...state,
            infoCausa: data
        })
    }

    const hardwareModal = (data, e) => {
        e.preventDefault()
        setStateModal({
            ...state,
            nuevoHardware: true
        })
        setDatah({
            ...datah,
            equipoid: data.equipoid
        })
    }

    const softwareModal = (data, e) => {
        e.preventDefault()
        setStateModal({
            ...state,
            nuevoSoftware: true
        })
        setDatas({
            ...datas,
            equipoid: data.equipoid
        })
    }

    const submit = async (e)=>{
        e.preventDefault()
        if(data.numeropc===""){
            alert("debe ingresar el Numero de PC")
        }else if(data.tipo===""){
            alert("debe ingresar la tipo")
        }else if(data.marca===""){
            alert("debe ingresar la marca")
        }else if(data.fecha_adquisicion===""){
            alert("debe ingresar la fecha_adquisicion")
        }else if(data.serie===""){
            alert("debe ingresar la serie")
        }else{
            const respuesta =  await Axios.post(`${url}/createEqui`,data)
            if(respuesta.data.sms ==="ok"){
                alert("Creado correctamente")
                allEquipos()
            }else{
              alert(respuesta.data.sms)
            }
        }
    }

    const submithardware = async (e)=>{
        e.preventDefault()
        if(datah.nombre===""){
            alert("debe ingresar el Nombre")
        }else if(datah.detalle===""){
            alert("debe ingresar el detalle")
        }else{
            const respuesta =  await Axios.post(`${url}/createHard`,datah)
            if(respuesta.data.sms ==="ok"){
                alert(respuesta.data.mensaje)
                setDatah({...datah,nombre:"",detalle:""})
                allEquipos()
            }else{
              alert(respuesta.data.sms)
            }
        }
    }

    const submitSoftware = async (e)=>{
        e.preventDefault()
        if(datas.categoria===""){
            alert("debe ingresar el Nombre")
        }else if(datas.nombre===""){
            alert("debe ingresar el detalle")
        }else if(datas.version===""){
            alert("debe ingresar el detalle")
        }else if(datas.licencia===""){
            alert("debe ingresar el detalle")
        }else{
            const respuesta =  await Axios.post(`${url}/createSoft`,datas)
            if(respuesta.data.sms ==="ok"){
                alert(respuesta.data.mensaje)
                setDatah({...datas,
                categoria: "",
                nombre: "",
                version: "",
                licencia: "",})
                allEquipos()
            }else{
              alert(respuesta.data.sms)
            }
        }
      }


    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
        return (

            <tr key={index}>
                <th>
                    <button onClick={(e) => { infoCausa(todo, e) }} style={{ margin: "4px" }}>info</button>
                    <button onClick={(e) => { hardwareModal(todo, e) }} style={{ margin: "4px" }}>Hardware</button>
                    <button onClick={(e) => { softwareModal(todo, e) }} style={{ margin: "4px" }}>Software</button>
                </th>
                <th>{todo.numeropc}</th>
                <th scope="row">{todo.tipo}</th>
                <td>{todo.marca}</td>
                <td>{todo.fecha_adquisicion}</td>
                <td>{todo.serie}</td>
            </tr>

        )
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (

            <>
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    style={{ border: "1px solid", padding: "5px" }}
                >
                    {number}
                </li>


            </>

        );
    });


    useEffect((e) => {
        allEquipos()
    }, [])


    //FUNCION PARA CARGAR LOS DATOS DE LOS TERRENOS

    const allEquipos = async () => {
        try {
            const result = await Axios.get(`${url}/dataEqui/${params.labid}`)
            console.log(result.data)
            setState({
                ...state,
                todos: result.data.result,
                currentPage: 1

            })
        } catch (e) {
            console.log(e)
        }
    }


    const allEquiposHard = async (idhard) => {
        try {
            const result = await Axios.get(`${url}/alldataHard/${idhard}`)
            console.log("hard:"+result.data.resultado)
            setState({
                ...state,
                todosHard: result.data.resultado,
                currentPage: 1

            })
        } catch (e) {
            console.log(e)
        }
    }

    const allEquiposSof = async (idsoft) => {
        try {
            const result = await Axios.get(`${url}/alldataSoft/${idsoft}`)
            console.log("sof:"+ result.data.resultado)
            setState({
                ...state,
                todosSoft: result.data.resultado,
                currentPage: 1

            })
        } catch (e) {
            console.log(e)
        }
    }




    const BuscarEquipo = async (e) => {
        if (e.target.value === "") {
            allEquipos()
        } else if (e.key === 'Enter') {
            try {
                const respuesta = await Axios.get('/getCausaFiltro/' + state.search)
                setState({
                    ...state,
                    todos: respuesta.data.causas
                })
            } catch (e) {

            }

        }

    }




    return (

        <div>
            <br></br>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Filtrar :</label><br></br>
                                <input type="text" className="form-control" placeholder="Busqueda Equipo" aria-label="codigobuscar" aria-describedby="addon-wrapping" onChange={onchange} onKeyUp={(e) => BuscarEquipo(e)} id="search" name="search" value={state.search} />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="exampleInputEmail1" style={{ textAlign: "center", width: "100%" }}>Acciones:</label><br></br>
                            <div className="">
                                <button type="button" className="btn btn-success" style={{ float: "right" }} onClick={(e) => setStateModal({ ...stateModal, nuevoEquipoModal: true })}>Nuevo Equipo</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="row" style={{ padding: "12px" }} className="overflow-auto">
                        <Table>
                            <thead style={{ textAlign: "center", background: "#343a40", color: "white" }}>
                                <tr>
                                    <th>OPCIONES</th>
                                    <th>NUMEROPC</th>
                                    <th>TIPO</th>
                                    <th>MARCA</th>
                                    <th>FECHA ADQUISICION</th>
                                    <th>SERIE</th>
                                </tr>
                            </thead>
                            <tbody style={{ padding: "12px", textAlign: "center" }}  >
                                {renderTodos}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>

            {/* MODAL REGISTRO DE CAUSAS*/}
            <Modal isOpen={stateModal.nuevoSoftware} toggle={() => {
                setStateModal({
                    ...stateModal,
                    nuevoSoftware: false
                })
            }}
                style={{ maxWidth: "100%", padding: "20px" }}
            >
                <ModalHeader toggle={() => {
                    setStateModal({
                        ...stateModal,
                        nuevoSoftware: false
                    })
                }
                }
                    style={{ background: "black", color: "white" }}>REGISTRO DE NUEVO SOFTWARE</ModalHeader>
                <ModalBody>

                    
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Categoria: </label><br></br>
                                <input type="text" className="form-control" onChange={onchangedatas} value={datas.categoria} id="categoria" name="categoria" placeholder="categoria" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Nombre: </label><br></br>
                                <input type="text" className="form-control" onChange={onchangedatas} value={datas.nombre} id="nombre" name="nombre" placeholder="Nombre" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Version:</label><br></br>
                                <input type="text" className="form-control" onChange={onchangedatas} value={datas.version} id="version" name="version" placeholder="version" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Licencia: </label><br></br>
                                <input type="text" className="form-control" onChange={onchangedatas} value={datas.licencia} id="licencia" name="licencia" placeholder="licencia" />
                            </div>
                        </div>
                        
                    </div>
                </ModalBody>
                {<ModalFooter>
                    <Button color="primary" onClick={submitSoftware} >Aceptar</Button>{' '}
                    <Button color="secondary" onClick={(e) => {
                        setStateModal({
                            ...stateModal,
                            nuevoSoftware: false
                        })
                    }}>Cancelar</Button>
                </ModalFooter>}
            </Modal>
            {/* FIN MODAL REGISTRO DE USUARIOS*/}




            {/* MODAL EDITAR DE CAUSAS*/}
            <Modal isOpen={stateModal.nuevoEquipoModal} toggle={() => {
                setStateModal({
                    ...stateModal,
                    nuevoEquipoModal: false,
                })
                setState({
                    ...state,
                    infoModal: {}

                })
            }}
                style={{ maxWidth: "100%", padding: "20px" }}
            >
                <ModalHeader toggle={() => {
                    setStateModal({
                        ...stateModal,
                        nuevoEquipoModal: false,
                    })
                    setState({
                        ...state,
                        infoModal: {}

                    })
                }
                }
                    style={{ background: "black", color: "white" }}>EDITAR DE NUEVAS CAUSAS</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Numero de PC: </label><br></br>
                                <input type="text" className="form-control" onChange={onchangedata} value={data.numeropc} id="numeropc" name="numeropc" placeholder="Numero de PC" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tipo :</label><br></br>
                                <input type="text" className="form-control" onChange={onchangedata} value={data.tipo} id="tipo" name="tipo" placeholder="Tipo" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Marca:</label><br></br>
                                <input type="text" className="form-control" onChange={onchangedata} value={data.marca} id="marca" name="marca" placeholder="Marca" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Fecha de adquisición:</label><br></br>
                                <input type="date" className="form-control" onChange={onchangedata} value={data.fecha_adquisicion} id="fecha_adquisicion" name="fecha_adquisicion" placeholder="Fecha de adquisición" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Serie:</label><br></br>
                                <input type="text" className="form-control" onChange={onchangedata} value={data.serie} id="serie" name="serie" placeholder="Serie" />
                            </div>
                        </div>
                        
                    </div>
                </ModalBody>
                {<ModalFooter>
                    <Button color="primary" onClick={submit}>Aceptar</Button>{' '}
                    <Button color="secondary" onClick={(e) => {
                        setStateModal({
                            ...stateModal,
                            nuevoEquipoModal: false
                        })
                    }}>Cancelar</Button>
                </ModalFooter>}
            </Modal>
            {/* FIN MODAL EDITAR DE USUARIOS*/}




            {/* MODAL REGISTRO DE MOVIMIENTOS */}
            <Modal isOpen={stateModal.nuevoHardware} toggle={() => {
                setStateModal({
                    ...stateModal,
                    nuevoHardware: false
                })
            }}
                style={{ maxWidth: "100%", padding: "20px" }}
            >
                <ModalHeader toggle={() => {
                    setStateModal({
                        ...stateModal,
                        nuevoHardware: false
                    })
                }
                }
                    style={{ background: "black", color: "white" }}>REGISTRO DEL HARDWARE</ModalHeader>
                <ModalBody>
                <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Nombre del Hadware: </label><br></br>
                                <input type="text" className="form-control" onChange={onchangedatah} value={datah.nombre} id="nombre" name="nombre" placeholder="Nombre" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Detalle:</label><br></br>
                                <textarea rows="6" className="form-control" onChange={onchangedatah} value={datah.detalle} id="detalle" name="detalle" placeholder="Detalle" />
                            </div>
                        </div>
                        
                    </div>


                </ModalBody>
                {<ModalFooter>
                    <Button color="primary" onClick={submithardware}>Aceptar</Button>{' '}
                    <Button color="secondary" onClick={(e) => {
                        setStateModal({
                            ...stateModal,
                            nuevoHardware: false
                        })
                    }}>Cancelar</Button>
                </ModalFooter>}
            </Modal>              {/* FIN MODAL REGISTRO DE MOVIMIENTOS*/}





            {/* MODAL INFO DE CAUSAS*/}
            <Modal isOpen={stateModal.infoModal} toggle={() => {
                setStateModal({
                    ...stateModal,
                    infoModal: false
                })
            }}
                style={{ maxWidth: "60%", padding: "20px" }}
            >
                <ModalHeader toggle={() => {
                    setStateModal({
                        ...stateModal,
                        infoModal: false
                    })
                }
                }
                    style={{ background: "black", color: "white" }}>INFORMACION DE EQUIPO</ModalHeader>
                <ModalBody>
                    <div className="col-md-12">
                    <h3 style={{padding:"12px",width:"100%"}}>INFORMACION DE HARDWARE</h3>
                        <div className="row">
                           
                           <Table>
                               <thead>
                                  <tr>
                                  <th>NOMBRE DEL HARWARE</th>
                                   <th>DETALLE</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {
                                      state.todosHard.map((data,index)=>(
                                        <tr key={index}>
                                          <th>{data.nombre}</th>
                                          <th><textarea rows="6" value={data.detalle}></textarea></th>
                                        </tr>
                                      ))
                                  }
                               </tbody>
                           </Table>

                        </div>
                        <br></br>
                        <h3 style={{padding:"12px",width:"100%"}}>INFORMACION DE SOFTWARE</h3>
                        <div className="row">
                           
                           <Table>
                               <thead>
                                  <tr>
                                  <th>NOMBRE DEL SOFTWARE</th>
                                   <th>CATEGORIA</th>
                                   <th>VERSION</th>
                                   <th>LICENCIA</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {
                                      state.todosSoft.map((data,index)=>(
                                        <tr key={index}>
                                          <th>{data.nombre}</th>
                                          <th>{data.categoria}</th>
                                          <th>{data.version}</th>
                                          <th>{data.licencia}</th>
                                        </tr>
                                      ))
                                  }
                               </tbody>
                           </Table>

                        </div>

                       
                    </div>
                </ModalBody>
                {/*<ModalFooter>
                    <Button color="primary" >Aceptar</Button>{' '}
                    <Button color="secondary" onClick={(e) => {
                        setStateModal({
                            ...stateModal,
                            infoModal: false
                        })
                    }}>Cancelar</Button>
                </ModalFooter>*/}
            </Modal>
            {/* FIN MODAL INFO DE USUARIOS*/}

        </div>

    )
}

export default Equipos
