import { Avatar, Button, Drawer, Grid, IconButton, InputBase, Paper } from '@material-ui/core'
import React, { Component } from 'react'
import FilterListIcon from '@material-ui/icons/FilterList';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import El6 from '../Assets/Ellipse30.png';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuidv4 } from 'uuid';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Dashboard extends Component {
    state={
        opentodo:false,
        openProgress:false,
        openComplete:false,
        drawer:false,
        open:false,
        dataTodo:[]
    }
    componentWillMount(){
       setInterval(() => {
           this.fetchTodo();
       }, 2000); 
    }
    
    fetchTodo=()=>{
          axios.get('https://todobackendass.herokuapp.com/todo/get',{
            headers:{
                "Content-Type":"application/json"
        }
        }).then(res =>{
            if(res.data.status) {
           const dataTodo = res.data.data?.filter(function (obj) {
                    return obj.status === 'todo';
            })
             const dataProgress= res.data.data?.filter(function (obj) {
                    return obj.status === 'progress';
            })
             const dataComplete= res.data.data?.filter(function (obj) {
                    return obj.status === 'complete';
            })
           console.log(res.data.data,"todo:",dataTodo)
           this.setState({
               allData:res.data.data,
               dataTodo:dataTodo.reverse(),
               dataProgress:dataProgress.reverse(),
               dataComplete:dataComplete.reverse()
           })
          }
        }).catch(err=>{
            alert("Something went wrong",err)
        })
    }
    closedrawer=()=>{
       this.setState({
       drawer:false,
       clciked:false
       }) 
    }
    openData=(id)=>{
       this.setState({
       drawer:true
       })
       const data= this.state.allData?.filter(function (obj) {
                    return obj._id === id ;
        })
        console.log('my data',id,data)
        this.setState({
            editdata:data
        })
    }
    openformTodo=()=>{
       this.setState({
           status:"todo",
            opentodo:!this.state.opentodo,
        openProgress:false,
        openComplete:false
       })
    }
    openformProgress=()=>{
       this.setState({
           status:"progress",
            opentodo:false,
        openProgress:!this.state.openProgress,
        openComplete:false
       })
    }
    openformComplete=()=>{
       this.setState({
           status:"complete",
            opentodo:false,
        openProgress:false,
        openComplete:!this.state.openComplete
       })
    }
    changecss=()=>{
        this.setState({
            border:".5px solid grey",
            borderRadius:"5px"
        })
    }
    clearcss=()=>{
       this.setState({
            border:"0 solid grey",
            borderRadius:"0px"
        }) 
    }
    addTodo=()=>{
        const data={
        title:this.state.title,
        discription:this.state.description,
        user_id: localStorage.getItem("user_id"),
        status: this.state.status 
        }
        if(this.state.status === "todo"){
            this.setState({
            dataTodo: [{
            title:this.state.title,
            discription:this.state.description,
            user: {
            _id:localStorage.getItem("user_id"),
            name:localStorage.getItem("name"),
            email:localStorage.getItem("email"),
        },
        status: this.state.status 
            },...this.state.dataTodo]
        })
        }
        if(this.state.status === "progress"){
            this.setState({
            dataProgress: [{
            title:this.state.title,
            discription:this.state.description,
            user: {
            _id:localStorage.getItem("user_id"),
            name:localStorage.getItem("name"),
            email:localStorage.getItem("email"),
        },
        status: this.state.status 
            },...this.state.dataProgress]
        })
        }
        if(this.state.status === "complete"){
            this.setState({
            dataComplete: [{
            title:this.state.title,
            discription:this.state.description,
            user: {
            _id:localStorage.getItem("user_id"),
            name:localStorage.getItem("name"),
            email:localStorage.getItem("email"),
        },
        status: this.state.status 
            },...this.state.dataComplete]
        })
        }
        
        axios.post('https://todobackendass.herokuapp.com/todo/upload',data,{
            headers:{
                "Content-Type":"application/json"
        }
        }).then(res =>{
            if(res.data.status) {
             this.setState({open:true,
            delmessage:"Hurry ! you added successfully",
            opentodo:false,
            openProgress:false,
            openComplete:false,
            title:"",
            description:""
           });
            this.fetchTodo(); 

        }
        }).catch(err=>{
            this.fetchTodo(); 
             this.setState({delmessage:"Something went wrong"})
        })
    }
    deleteTodo=(id)=>{
        this.setState({
            drawer:false,
        })
        
        axios.delete(`https://todobackendass.herokuapp.com/todo/delete/${id}`,{
            headers:{
                "Content-Type":"application/json"
        }
        }).then(res =>{
            if(res.data.status) {
             this.setState({open:true,
                delmessage:"Deleted Successfully",
            opentodo:false,
        openProgress:false,
        openComplete:false}); 
        this.fetchTodo(); 
        }
        }).catch(err=>{
            alert("Something went wrong",err)
        })
    }
    updateTodo=()=>{
        this.setState({
            clciked:true
        })
        const data={
        title:this.state.title,
        discription:this.state.descriptionC,
        }
        axios.patch(`https://todobackendass.herokuapp.com/todo/edit/${this.state.editdata[0]?._id}`,data,{
            headers:{
                "Content-Type":"application/json"
        }
        }).then(res =>{
            if(res.data.status) {
             this.setState({open:true,
            delmessage:"Hurry ! you updated successfully",
            opentodo:false,
            openProgress:false,
            clciked:false,
            openComplete:false,
            drawer:false}); 
            this.fetchTodo(); 
            }
            }).catch(err=>{
                alert("Something went wrong",err)
            })
    }
    handleChnage=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      this.setState({open:false});
    };
    onDragOver = (ev) => {
        ev.preventDefault(); 
    }
    onDragStart = (ev, id,val) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
        ev.dataTransfer.setData("drop", val);
        console.log(ev.dataTransfer.getData('id'))
    }
    onDrop = (ev, cat,status) => {
       let id = ev.dataTransfer.getData("id");
       let arrayToSubtarct = ev.dataTransfer.getData("drop");
       
        if(cat===arrayToSubtarct){
            return false
        }
        const data = this.state.allData?.filter(function (obj) {
                return obj._id === id;
        })
        const dataRemove = this.state[arrayToSubtarct]?.filter(function (obj) {
                return obj._id !== id;
        })
       this.setState({
           [cat]: [...this.state[cat],data[0]],
           [arrayToSubtarct]:dataRemove
       })
        const dataSend={
        title:data[0]?.title,
        discription:data[0]?.descriptionC,
        status:status
        }
        axios.patch(`https://todobackendass.herokuapp.com/todo/edit/${id}`,dataSend,{
            headers:{
                "Content-Type":"application/json"
        }
        }).then(res =>{
            if(res.data.status) {
             this.setState({open:true,
            delmessage:"Hurry ! you updated successfully",
            opentodo:false,
            openProgress:false,
            clciked:false,
            openComplete:false,
            drawer:false}); 
            this.fetchTodo(); 
            }
             window.location.reload();
            }).catch(err=>{
                alert("Something went wrong",err)
        })
    }
    
    render() {
        console.log(this.state.dataTodo)
       
        const {dataTodo,dataProgress,dataComplete,delmessage} = this.state
        return (
            <Grid>
                 <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                {delmessage}
                </Alert>
            </Snackbar>
            
                <div className="flex_dashboard">
                    <div>
                        <h3>Projects</h3>
                    </div>
                    <div>
                        <FilterListIcon style={{fontSize:"28"}}/>
                    </div>
                </div>
              
                <div className="flex_column_section">
                    <div className="inner_section"  onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "dataTodo","todo")}}>
                        <div className="inner_section_heading">
                            <div>To do</div>
                            <div className="span_number">{dataTodo?.length}</div>
                        </div>
                        <div>
                            <Button variant="conatiner" onClick={this.openformTodo}
                            style={{margin:"0px 10%",width:"80%",background:"#d0dddd"}}> 
                            <AddOutlinedIcon style={{color:"#329C89"}} /> </Button>
                        </div>
                        <div>
                            {this.state.opentodo && <div className="card_form_section" >
                                 <InputBase
                                    defaultValue=""
                                    name="title"
                                    value={this.state.title}
                                    placeholder="Give your task a title"
                                     onChange={this.handleChnage}
                                    style={{color:"grey",padding:"5px",fontWeight:"bold"}}    
                                />
                                 <textarea
                                    defaultValue=""
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleChnage}
                                    style={{color:"grey",border:"0px",padding:"5px",width:"90%"}}    
                                />
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <Avatar style={{fontSize:"18px"}}/> <IconButton onClick={this.addTodo} ><SendIcon style={{fontSize:"18px"}}/></IconButton>
                                </div>
                            </div>
                        }
                        {dataTodo?.map((data) =>
                            <div className="card_form_section" draggable onDragStart = {(e) => this.onDragStart(e, data._id,"dataTodo")}>
                                 <div onClick={(e)=>this.openData(data._id)}>
                                     <p style={{color:"black",padding:"5px",fontWeight:"bold",textTransform:"capitalize"}}    
                                >{data?.title}</p>
                                 <p style={{color:"grey",padding:"5px"}}>
                                 {data.discription?.substr(0, 100)}...</p> 
                                </div>
                                  <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <Avatar style={{fontSize:"24px",background:"#329C89"}} alt={data.users?.name.toUpperCase()} src="\"/> <IconButton onClick={(e)=>this.deleteTodo(data._id)} ><DeleteOutlineIcon style={{fontSize:"18px"}}/></IconButton>
                                </div> 
                        </div>
                        )}
                        </div>
                    </div>
                    <div className="inner_section" onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "dataProgress","progress")}}>
                         <div className="inner_section_heading">
                            <div>In Progress</div>
                            <div className="span_number">{dataProgress?.length}</div>
                        </div>
                        <div>
                            <Button variant="conatiner" onClick={this.openformProgress}
                            style={{margin:"0px 10%",width:"80%",background:"#d0dddd"}}> 
                            <AddOutlinedIcon style={{color:"#329C89"}} /> </Button>
                        </div>
                        <div >
                           {this.state.openProgress &&  <div className="card_form_section">
                                 <InputBase
                                    defaultValue=""
                                    name="title"
                                    value={this.state.title}
                                    placeholder="Give your task a title"
                                     onChange={this.handleChnage}
                                    style={{color:"grey",padding:"5px",fontWeight:"bold"}}    
                                />
                                 <textarea
                                    defaultValue=""
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleChnage}
                                    style={{color:"grey",border:"0px",padding:"5px",width:"90%"}}    
                                />
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <Avatar style={{fontSize:"18px"}}/> <IconButton onClick={this.addTodo} ><SendIcon style={{fontSize:"18px"}}/></IconButton>
                                </div>
                            </div>
                           }
                            {dataProgress?.map((data) =>
                            <div className="card_form_section" draggable onDragStart = {(e) => this.onDragStart(e, data._id,"dataProgress")}>
                                 <div onClick={(e)=>this.openData(data._id)}>
                                     <p style={{color:"black",padding:"5px",fontWeight:"bold",textTransform:"capitalize"}}    
                                >{data?.title}</p>
                                 <p style={{color:"grey",padding:"5px"}}>
                                 {data.discription?.substr(0, 100)}...</p> 
                                 </div>
                              <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <Avatar style={{fontSize:"24px",background:"#329C89"}} alt={data.users?.name.toUpperCase()} src="\"/> <IconButton onClick={(e)=>this.deleteTodo(data._id)} ><DeleteOutlineIcon style={{fontSize:"18px"}}/></IconButton>
                                </div> 
                        </div>
                        )}
                        </div>
                    
                    </div>
                    <div className="inner_section" onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, "dataComplete","complete")}}>
                         <div className="inner_section_heading">
                           <div>Completed</div>
                            <div className="span_number">{dataComplete?.length}</div>
                        </div>
                        <div>
                            <Button variant="conatiner" onClick={this.openformComplete}
                            style={{margin:"0px 10%",width:"80%",background:"#d0dddd"}}> 
                            <AddOutlinedIcon style={{color:"#329C89"}} /> </Button>
                        </div>
                        <div >
                            {this.state.openComplete && <div className="card_form_section">
                                 <InputBase
                                    defaultValue=""
                                    name="title"
                                    value={this.state.title}
                                    placeholder="Give your task a title"
                                     onChange={this.handleChnage}
                                    style={{color:"grey",padding:"5px",fontWeight:"bold"}}    
                                />
                                 <textarea
                                    defaultValue=""
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleChnage}
                                    style={{color:"grey",border:"0px",padding:"5px",width:"90%"}}    
                                />
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <Avatar style={{fontSize:"18px"}}/> <IconButton onClick={this.addTodo} ><SendIcon style={{fontSize:"18px"}}/></IconButton>
                                </div>
                            </div>
                       }        
                       {dataComplete?.map((data) =>
                            <div className="card_form_section" draggable onDragStart = {(e) => this.onDragStart(e, data._id,"dataComplete",)}>
                                 <div onClick={(e)=>this.openData(data._id)}>
                                   <p style={{color:"black",padding:"5px",fontWeight:"bold",textTransform:"capitalize"}}    
                                >{data?.title}</p>
                                 <p style={{color:"grey",padding:"5px"}}>
                                 {data.discription?.substr(0, 100)}...</p> 
                                 </div> 
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <Avatar style={{fontSize:"24px",background:"#329C89"}} alt={data.users?.name.toUpperCase()} src="\"/> <IconButton onClick={(e)=>this.deleteTodo(data._id)} ><DeleteOutlineIcon style={{fontSize:"18px"}}/></IconButton>
                                </div> 
                        </div>
                        )}               
                        </div>
                    </div>
                </div>
                    {this.state.drawer&&<div className="absolute_side_drawer">   
                        <Button style={{position:"absolute",right:"0",zoom:"1.5"}} onClick={this.closedrawer}>
                            <CloseIcon />
                        </Button>
                        <InputBase
                            defaultValue={this.state.editdata[0]?.title}
                            onFocus={this.changecss}
                            onBlur={this.clearcss}
                            name="title"
                            onChange={this.handleChnage}
                            style=
                            {{color:"black",padding:"5px",margin:"10px",fontWeight:"bold",fontSize:"20px",
                            border:`${this.state.border}`,borderRadius:`${this.state.borderRadius}`}}    
                        />
                        <table className="table_styling">
                            <tr>
                                <td className="td_title">Created By</td>
                                <td> <div style={{display:"flex"}}>
                            <Avatar alt="Saundarya" src={El6}/>
                            <div style={{margin:"10px",ontSize:"18px"}}>{this.state.editdata[0]?.users.name.toUpperCase()} </div>
                            </div></td>
                            </tr>
                            <tr>
                                <td className="td_title">Description</td>
                                <td><textarea
                                 name="descriptionC"
                                 onChange={this.handleChnage}
                                    defaultValue={this.state.editdata[0]?.discription}
                                    style={{color:"black",border:"0px",fontSize:"17px",padding:"15px",width:"100%",height:"30vh",fontFamily:"poppins"}}    
                                    /> </td>
                            </tr>
                        </table>
                            <Button  disabled= {this.state.clciked?true:false} onClick={this.updateTodo} variant="contained" style={{textAlign:"center",justifyContent:"center",display:"flex", margin:"0 auto"}} color="primary"><SendIcon style={{fontSize:"18px",marginRight:"4px"}}/>UPDATE</Button>

                    </div>
                    }
            </Grid>
        )
    }
}
