import React,{Suspense,lazy} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

import * as serviceWorker from './serviceWorker';
import logo from './assets/256x256.gif'
const App= lazy(() => import('./App'))


ReactDOM.render(
  <React.StrictMode>
    
     <Suspense fallback={<center><img src={logo} alt="loading..." style={{marginTop:"150px",marginBottom:"100px"}} /></center>}>
     <App />
    </Suspense>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();