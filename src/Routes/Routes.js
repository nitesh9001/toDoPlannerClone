import React, { useEffect,useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from '../Component/Register';
import LayOut from '../Component/LayOut';
import Dashboard from '../Component/Dashboard';
import axios from 'axios';

export default function Routes() {

  const [SearchData, setSearchData] = useState();
  
  const onSearch=(key)=>{
         const data={
           title:key,
        }
        axios.post('https://todobackendass.herokuapp.com/todo/search',data,{
            headers:{
                "Content-Type":"application/json"
        }
        }).then(res =>{
            if(res.data.status) {
            setSearchData(res.data)
            }
        }).catch(err=>{
            alert("Something went wrong",err)
        })
    }
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

