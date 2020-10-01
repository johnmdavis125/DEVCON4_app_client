import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom'
// import './Navbar.css'
import { IconContext } from 'react-icons'

export default function Navbar(props) {
    // const [sidebar, setSidebar] = useState(false)
    // const showSidebar = () => setSidebar(!sidebar)

    let navBarItems = [
        <li key={1}>
            <a href='/home'>Home Page</a>
        </li>,
    ];

    if (props.isLoggedIn) {
        navBarItems.push(
            <li key={2}>
                <a href='/logout'>Log Out</a>
            </li>
        );
        navBarItems.push(
            <li key={3}>
                <a href='/questions'>Questions Page</a>
            </li>
        );
        navBarItems.push(
            <li key={4}>
                <a href='/profile'>Profile</a>
            </li>
        );
    } else {
        navBarItems.push(
            <li key={5}>
                <a href='/signup'>Sign Up</a>
            </li>
        );
        navBarItems.push(
            <li key={6}>
                <a href='/login'>Log In</a>
            </li>
        );
    };

    return (

        <>
            <h1>DEVCON4 - Navbar</h1>
            <nav>
                <ul>{navBarItems}</ul>
            </nav>
        </>

        // <>
        // <IconContext.Provider value={{color: 'ghostwhite'}}>
        //     <div className='navbar'>
        //         <Link to ="#" className="menu-bars">
        //             <FaIcons.FaBars onClick={showSidebar}/>
        //         </Link> 
        //     </div>  
        //     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        //         <ul className="nav-menu-items" onClick={showSidebar}>
        //             <li className="navbar-toggle">
        //                 <Link to="#" className='menu-bars'>
        //                     <AiIcons.AiOutlineClose />
        //                 </Link>
        //             </li>
        //             {SidebarData.map((item, i)=>{
        //                 return(
        //                     <li key={i} className={item.class}>
        //                         <Link to={item.path}>
        //                             {item.icon}
        //                             <span>{item.title}</span>
        //                         </Link>
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //     </nav>
        //     </IconContext.Provider>
        // </>
    )
}
