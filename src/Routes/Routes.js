import React, { useEffect,useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from '../Component/Register';
import LayOut from '../Component/LayOut';
import Dashboard from '../Component/Dashboard';

export default function Routes() {
  
  return (
     <Router>
          {localStorage.getItem("token") ?
          <LayOut>
          <Route exact path={"/"} component={Dashboard} />
         </LayOut>
         :<Route exact path={"/"} component={Register} />
        }
      </Router>
  )
}

