import React from 'react'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import Equipos from './componentes/equipos/equipos'

const Rutas =()=>{
    return(
        <Switch>
                    <Route path="/equipos/:labid" component={Equipos}></Route>
        </Switch>
    )
}

export default Rutas