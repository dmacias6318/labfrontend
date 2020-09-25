import React, { useState } from 'react'
import Axios from 'axios'
import './login.css'
import { url } from '../../url'
const Login = () => {

    const [state, setState] = useState({
        correo: "",
        clave: ""
    })

    const onChange = (e) => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = async () => {
        if (state.correo === "") {
            alert("debe ingresar el usuario")
        } else if (state.clave === "") {
            alert("debe ingresar la clave")
        } else {
            const respuesta = await Axios.post(`${url}/login`, state)
            if (respuesta.data.sms === "ok") {
                localStorage.setItem("token", respuesta.data.token)
                localStorage.setItem("nombres", respuesta.data.nombres)
                window.location = "/"
            } else {
                alert(respuesta.data.mensaje)
            }
        }
    }

    return (


        < div style={{ height: '100vh', background: 'linear-gradient(45deg, white, white)' }} >

            <div className="wrapper fadeInDown" >
                <div id="formContent" style={{background:"white"}}>
                    {/* Tabs Titles */}
                    {/* Icon */}
                    
                    <h1 style={{ fontFamily: ' initial', fontSize: '30px',padding:"12px" }}> CREDENCIALES </h1>
                    {/* Login Form */}
                    <form>
                        <div classname="form-group">
                            <label htmlfor="username" classname="text-info">Username:</label><br />
                            <input type="text" name="correo" type="text" onChange={onChange} value={state.correo} classname="form-control" />
                        </div>
                        <div classname="form-group">
                            <label htmlfor="password" classname="text-info">Password:</label><br />
                            <input type="password" name="clave" type="text" onChange={onChange} value={state.clave} classname="form-control" />
                        </div>

                        <div id="register-link" classname="text-right">
                            <input type="button" onClick={submit} value="iniciar"></input>
                        </div>
                    </form>
                    {/* Remind Passowrd */}
                    <div id="formFooter" style={{ background: "#cdb25a!important" }}>
                        <a className="underlineHover" href="#" style={{ fontFamily: 'initial', fontSize: '20px' }} >LABORATORIOS</a>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Login