import React from 'react'
import * as RiIcons from "react-icons/ri"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        class: 'nav-text'
    },
    {
        title: 'Forums',
        path: '/questions',
        icon: <IoIcons.IoMdSearch />,
        class: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <RiIcons.RiCollageFill />,
        class: 'nav-text'
    },
]