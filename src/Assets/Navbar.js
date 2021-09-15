import { Avatar, InputBase } from '@material-ui/core'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Img from '../Assets/img1.png';
import El1 from '../Assets/ellipse27.png';
import El2 from '../Assets/Ellipse25.png';
import El3 from '../Assets/Ellipse26.png';
import El4 from '../Assets/Ellipse28.png';
import El5 from '../Assets/Ellipse29.png';
import El6 from '../Assets/Ellipse30.png';
import El7 from '../Assets/Ellipse31.png';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    marginTop: 3,
  },
  textField: {
    width: '40ch',
    border:"0px",
    outline:"none",
    borderRadius:"0px"
  },
}));

export default function Navbar() {
    const classes = useStyles();
    return (
        <div className="main_flex_navbar_top">
        <div className="flex_navbar_top">
          <div className={classes.withoutLabel}>
            <SearchOutlinedIcon style={{color:"grey",padding:"10px"}}/>
          </div>
          <div>
              <InputBase
                defaultValue="Search"
                style={{color:"grey",width:"200px"}}    
            />
          </div>
        </div>
        <div>
             <AvatarGroup max={7}>
            <Avatar alt="Remy Sharp" src={El4} />
            <Avatar alt="Travis Howard" src={El1} />
            <Avatar alt="Cindy Baker" src={El2}/>
            <Avatar alt="Agnes Walker" src={El3} />
            <Avatar alt="Trevor Henderson" src={El6} />
            <Avatar alt="Trevor Henderson" src={El5} />
            <Avatar alt="7"  />
            </AvatarGroup>
        </div>
        <div style={{display:"flex"}}>
          <div style={{margin:"10px",ontSize:"18px"}}>Hi {localStorage.getItem("name")} </div>
          <Avatar alt="Saundarya" src={El6}/>
        </div>
        </div>
    )
}
