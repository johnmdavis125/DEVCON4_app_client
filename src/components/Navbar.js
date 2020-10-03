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
        <li className='navbar-item' key={1}>
            <a href='/home'>Home Page</a>
        </li>,
    ];

    let navBarButtons = [];

    if (props.isLoggedIn) {
        navBarButtons.push(
            <li className='navbar-item' key={2}>
                <a className='button is-primary' href='/logout'>Log Out</a>
            </li>
        );
        navBarItems.push(
            <li className='navbar-item' key={3}>
                <a href='/questions'>Questions Page</a>
            </li>
        );
        navBarItems.push(
            <li className='navbar-item' key={4}>
                <a href='/profile'>Profile</a>
            </li>
        );
    } else {
        navBarButtons.push(
            <li className='navbar-item' key={5}>
                <a className='button is-primary' href='/signup'>
                    <strong>Sign Up</strong>
                </a>
            </li>
        );
        navBarButtons.push(
            <li className='navbar-item' key={6}>
                <a className='button is-light' href='/login'>Log In</a>
            </li>
        );
    };

    // const toggleMenu = () => {
    //     const burger = document.querySelector('.burger'); 
    //     const nav = document.querySelector('')
    // }


    return (

        <>
        <section className='hero is-dark'>
            <div className='hero-body'>
                <div className='container'>
                    <h1 className='title'>Welcome to DevCon4</h1>
                    <h2 className='subtitle'>A Community for Developers...By Developers</h2>
                </div>
            </div>
        </section>
        <nav className='navbar is-light' role='navigation' aria-label='main navigation'>
            <ul className='container' style={{display: 'flex'}}>
                <div className='navbar-brand'>
                    <a className='navbar-item'>
                        <img src='images/default.png' width='28' height='28'/>
                    </a>
                </div>
                
                <div className='navbar-start'>
                    {navBarItems}
                </div>  
            
                <div className='navbar-end'>
                    <div className='navbar-item'>
                        <div class='buttons' id='buttonsContainer'>
                            {navBarButtons}
                        </div>
                    </div>
                </div>



                    {/* <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                    </a> */}
                {/* </div>

                <div id='navbarBasicExample' className='navbar-menu'>
                    <div className='navbar-start'>
                        {navBarItems}
                        <a class='navbar-item is-active'>
                            Extra Item
                        </a>
                        <a class='navbar-item is-active'>
                            Extra Item
                        </a>
                    </div>  
                
                    <div className='navbar-end'>
                    <div className='navbar-item'>
                        <div class='buttons' id='buttonsContainer'>
                            {navBarButtons}
                        </div>
                    </div>
            
                </div>                */}
            
            </ul>
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
