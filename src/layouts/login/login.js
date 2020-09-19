import React from 'react'

const Login =()=>{
    return(
        <div>
               
               <div>
                   <input type="text" value={state.username}></input>
               </div>
               <div>
                   <input type="text" value={state.clave}></input>
               </div>
               <div>
                   <input type="button" value="iniciar"></input>
               </div>
             
        </div>
    )
}

export default Login