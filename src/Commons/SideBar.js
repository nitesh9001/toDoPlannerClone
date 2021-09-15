import React from 'react'
import './styles.css'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const navBarList=[{
    icon: <HomeOutlinedIcon />,
    path:"/dashboard",
    title:"Overview"
},{
    icon:<EqualizerOutlinedIcon/>,
    path:"/dashboard",
    title:"Stats"
},{
    icon:<FolderOpenOutlinedIcon />,
    path:"/dashboard",
    title:"Projects",
    active:true
},{
    icon:<TextsmsOutlinedIcon/>,
    path:"/dashboard",
    title:"Chat"
},{
    icon:<CalendarTodayOutlinedIcon />,
    path:"/dashboard",
    title:"Calendar"
}]

const bottomlist=[{
    icon: <SettingsOutlinedIcon />,
    path:"/dashboard",
    title:"Setting"
},{
    icon:<ExitToAppOutlinedIcon/>,
    path:"/dashboard",
    title:"Logout"
}]

export default function SideBar() {
    const logout=()=>{
      localStorage.clear();
      window.location.reload()
    }
    return (
        <div className="main_sidebar_outline">
            <div className="main_sidebar_top_list">
                <div className="main_sidebar_top_logo">
                    <h2 className="logo_text">.taskez</h2>
                </div>
                <div className="main_sidebar_top_mid_li">
               {navBarList.map((data)=>
               <li className={data.active?"active":""}>
                   <div style={{marginTop:"-5px",marginRight:"10px"}}>{data.icon}</div>
                   <div>{data.title} </div>
                </li>
               )}
            </div>
            </div>
            <div className="main_sidebar_top_mid_li">
    
                <li className={bottomlist[0].active?"active":""}>
                   <div style={{marginTop:"-5px",marginRight:"10px"}}>{bottomlist[0].icon}</div>
                   <div>{bottomlist[0].title} </div>
                </li>
                <li onClick={logout}
                 className={bottomlist[1].active?"active":""}>
                   <div style={{marginTop:"-5px",marginRight:"10px"}}>{bottomlist[1].icon}</div>
                   <div>{bottomlist[1].title} </div>
                </li>

            </div>
        </div>
    )
}
