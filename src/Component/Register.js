import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Checkbox, Grid, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import Img from '../Assets/img1.png';
import "./styles.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class Register extends Component {
    
    state={
        openLoginFlag:true,
        openSingupFlag:false,
        error:false,
        errorMessage:"",
        showPass:false,
        remember:false
    }
    componentDidMount(){
        console.log(document.cookie)
        this.setState({
            email:this.getCookie('emailid'),
        password:this.getCookie('password')})
    }
    getCookie=(cname)=>{var name = cname + "="; var decodedCookie = decodeURIComponent(document.cookie); var ca = decodedCookie.split(';'); for(var i = 0; i <ca.length; i++) { var c = ca[i]; while (c.charAt(0) === ' ') { c = c.substring(1); } if (c.indexOf(name) === 0) { return c.substring(name.length, c.length); } } return ""; } 
    openlogin=()=>{
      this.setState({
          openLoginFlag:true,
        openSingupFlag:false

      })
    }
    openSingup=()=>{
         this.setState({
          openLoginFlag:false,
        openSingupFlag:true
      })
    }
    changeVisibility=()=>{
        this.setState({
         showPass:!this.state.showPass
        })
    }
    validateEmail = (email) => {   
       const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(String(email).toLowerCase())  ? this.setState({
            email:email,
            error:false,
            errorMessage:""
        }) :this.setState({
            email:email,
            error:true,
            errorMessage:"Enter valid Email"

        });
    }
    validateName=(name)=>{
        const re = /^[A-Za-z\s]+$/;
       return re.test(String(name).toLowerCase())  ? this.setState({
            name:name,
            errorN:false,
            errorMessageN:""
        }) :this.setState({
            name:name,
            errorN:true,
            errorMessageN:"Name only conatins letter"

        });
    }
    onLogin= ()=>{
         this.setState({
            clciked:true
        })
        const data={
            email:this.state.email,
            password:this.state.password
        }
        axios.post('https://todobackendass.herokuapp.com/user/login',data,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res =>{
          console.log(res.data.data)
          localStorage.setItem("token",res.data.data.token);
          localStorage.setItem("remember",this.state.remember);
          localStorage.setItem("name",res.data.data.name);
          localStorage.setItem("user_id",res.data.data._id);
         
          window.location.reload();

        }).catch(err=>{
            this.setState({
                error:true,
                errorP:true,
                errorMessageP:"Invalid email or password"
        });
        })
    }
    onregister= ()=>{
        this.setState({
            clciked:true
        })
        const data={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('https://todobackendass.herokuapp.com/user/add',data,{
            headers:{
                "Content-Type":"application/json"
        }
        }).then(res =>{
          console.log(res.data.status)
          if(res.data.status) {
             this.setState({open:true});
          }
          setTimeout(() => {
                 window.location.reload();
            }, 2000 );
         
        }).catch(err=>{
            this.setState({
                errorP:true,
                error:true,
                errorN:true,
                errorMessageP:"Something went Wrong"
        });
    });
    }
    rememberme=(val)=>{
        console.log(val)
        if(val===true){
            document.cookie ="emailid="+this.state.email;
            document.cookie ="password="+this.state.password;
        }
    }

   handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      this.setState({open:false});
  };

    render() {
        return (
            <div>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                Hurry ! you regsitered successfully!
                </Alert>
            </Snackbar>
            <Container maxWidth="xl">
                 <Grid container >
                  <Grid item xs={6}>
                        <img src={Img} alt="" width="80%" className="imag1_iframe"/>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="div_form">
                            <div className="tabs_action">
                                <li onClick={this.openlogin} className={!this.state.openLoginFlag?"unselected":"selected"}>Login</li>
                                <li onClick={this.openSingup} className={!this.state.openSingupFlag?"unselected":"selected"}>Signup</li>
                            </div>
                            {this.state.openLoginFlag && <div className="form_inner_center">
                                <hr/>
                                <Typography variant="h6" style={{color:"#1A3B58"}}>To Continue</Typography>
                                <Typography variant="caption" style={{color: "#999999"}}>We need your name & Email</Typography>
                                <TextField
                                error= {this.state.error}
                                style={{width:"100%",margin:"20px auto"}}
                                variant="outlined"
                                id="outlined-start-adornment"
                                value={this.state.email}
                                type="text"
                                helperText={this.state.errorMessage}
                                onChange={e => this.validateEmail(e.target.value)}
                                placeholder="Email"
                            />
                               <TextField
                                error={this.state.errorP}
                                style={{width:"100%",margin:"20px auto"}}
                                variant="outlined"
                                id="outlined-start-adornment"
                                value={this.state.password}
                                onChange={e=>this.setState({password:e.target.value})}
                                InputProps={{
                                endAdornment:<InputAdornment position="end">
                               {!this.state.showPass ? <VisibilityIcon onClick={this.changeVisibility}/> : <VisibilityOffIcon onClick={this.changeVisibility}/>}
                                </InputAdornment>
                                }}
                                type={!this.state.showPass?"password" :"text"}
                                helperText={this.state.errorMessageP}
                                placeholder="Password"
                            />
                            <Button onClick={this.onLogin}
                            disabled= {this.state.clciked?true:false}
                            style={{width:"100%",margin:"10px auto",background:"#329C89",fontWeight:"bold"}} variant="contained" color="primary">
                               Login
                            </Button>
                            <div>
                             <Checkbox style={{color:"#329C89"}} onChange={e=>this.rememberme(e.target.checked)} value={this.state.remember}/>   Remember Me
                            </div>
                            </div>
                        }
                         {this.state.openSingupFlag && <div className="form_inner_center">
                                <hr/>
                                <TextField
                                style={{width:"100%",margin:"20px auto"}}
                                variant="outlined"
                                id="name"
                                value={this.state.name}
                                type="text"
                                helperText={this.state.errorMessageN}
                                onChange={e => this.validateName(e.target.value)}
                                placeholder="Full Name"
                                error={this.state.errorN}
                                
                                  />
                                 <TextField
                                error= {this.state.error}
                                style={{width:"100%",margin:"20px auto"}}
                                variant="outlined"
                                id="email"
                                value={this.state.email}
                                type="text"
                                helperText={this.state.errorMessage}
                                onChange={e => this.validateEmail(e.target.value)}
                                placeholder="Email"
                            />
                               <TextField
                                error={this.state.errorP}
                                style={{width:"100%",margin:"20px auto"}}
                                variant="outlined"
                                id="outlined-start-adornment"
                                value={this.state.password}
                                onChange={e=>this.setState({password:e.target.value})}
                                InputProps={{
                                endAdornment:<InputAdornment position="end">
                               {!this.state.showPass ? <VisibilityIcon onClick={this.changeVisibility}/> : <VisibilityOffIcon onClick={this.changeVisibility}/>}
                                </InputAdornment>
                                }}
                                type={!this.state.showPass?"password" :"text"}
                                 helperText={this.state.errorMessage}
                                placeholder="Password"
                            />
                            <Button
                            disabled= {this.state.clciked?true:false}
                            style={{width:"100%",margin:"10px auto",background:"#329C89",fontWeight:"bold"}} variant="contained" color="primary" onClick={this.onregister}>
                               Sign up
                            </Button>
                            <div>
                             <Checkbox style={{color:"#329C89"}}/>   Remember Me
                            </div>
                            </div>
                      }</div>
                    </Grid>
                 </Grid>
            </Container>     
            </div>
        )
    }
}
