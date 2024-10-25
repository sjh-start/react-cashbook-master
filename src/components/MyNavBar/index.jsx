import './index.scss'
import {useState} from "react";
import {NavBar} from 'antd-mobile'

export default function MyNavBar({title}) {
    return (
        <div className={'nav-bar'}>
            <div style={{height:'45px'}}></div>
            <NavBar back={null}>
                {title}
            </NavBar>
        </div>
    )
}
