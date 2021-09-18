import Navbar from '../Commons/Navbar';
import SideBar from '../Commons/SideBar';
import React, { Component } from 'react'
import { Container, Grid } from '@material-ui/core';

export default class LayOut extends Component {

    
    render() {
        return (
            <div className="layout_outter_layer">
            <Grid Container className="layout_inner_layer">
             <Grid item md={2} sm={3} className="layout_sidebar">
               <SideBar />
            </Grid>
            <Grid item md={10} sm={9}  className="layout_content">
                <Grid  md={12} sm={12}  className="layout_header">
                 <Navbar />
                </Grid>
                <Grid  md={12} sm={12}  className="layout_dasboard">
                    {this.props.children}
                </Grid>
            </Grid>
            </Grid>
            </div>

        )
    }
}