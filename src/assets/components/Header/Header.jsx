import React from 'react';
import s from './Header.module.css'

import { NavLink } from 'react-router-dom';

function Header(props){
    return (
        <header>
        <div className={s.header_inner}>
        <div className={s.logo_container}>
            <NavLink to="/home">
            <div className={s.logo}>
                <img src='/logo.svg' alt="logo"/>
                <img src="/solit-сlouds.svg" alt="solit-clouds" className={s.logo_text}/>
            </div>
            </NavLink>
            <span>Besties</span>  
            </div>
            <div className={s.coav}>
                    <span>У вас {props.user.count}</span>
                    <img src="/coin_SC.png" alt="coin" width="30" className={s.coin}/>
                <NavLink to="/">
                <div className={s.avatar}>{props.user.fio}</div>
                </NavLink>
            </div> 
        </div>
        </header>
    )
}

export default Header