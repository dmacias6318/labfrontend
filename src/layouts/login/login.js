import React,{useState} from 'react'
import Axios from 'axios'

const Login =()=>{

    const [state , setState]=useState({
        correo:"",
        clave:""
    })

    const onChange=(e)=>{
      e.preventDefault()
      setState({
          ...state,
          [e.target.name]:e.target.value
      })
    }

    const submit = async ()=>{
      if(state.correo===""){
          alert("debe ingresar el usuario")
      }else if(state.clave===""){
          alert("debe ingresar la clave")
      }else{
          const respuesta =  await Axios.post("http://localhost:5001/api/login",state)
          if(respuesta.data.sms ==="ok"){
            localStorage.setItem("token",respuesta.data.token)
            localStorage.setItem("nombres",respuesta.data.nombres)
            window.location="/"
          }else{
            alert(respuesta.data.mensaje)
          }
      }
    }

    return(
        <div>
               
               <div>
                   <input name="correo" type="text" onChange={onChange} value={state.correo}></input>
               </div>
               <div>
                   <input name="clave" type="text" onChange={onChange} value={state.clave}></input>
               </div>
               <div>
                   <input type="button" onClick={submit} value="iniciar"></input>
               </div>
             
        </div>
    )
}

export default Login