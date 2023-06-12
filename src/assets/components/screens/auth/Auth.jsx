import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import s from './auth.module.css'
import { TextField } from '@mui/material';
import axios from 'axios';

const Auth = (props) => {

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);

    const navigate = useNavigate();

    const handleChange1 = (event) => {
        setValue1(event.target.value);
        setError1(event.target.value === '');
    };

    const handleChange2 = (event) => {
        setValue2(event.target.value);
        setError2(event.target.value === '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (value1 === '') {
          setError1(true);
          return;
        }
        
        if (value2 === '') {
          setError2(true);
          return;
        }
        
        // обработка отправки формы с данными value1 и value2
        let user = (await axios.post("http://localhost:2222/login",
        { mail : value1, password : value2})).data
        if (Object.keys(user).length === 0) {
          setError3(true);
            return;
        } else {
          
          props.setCurrentUser(user);
          // console.log(props.user);
          navigate('/home');
        }
        
        // console.log(user)
        // console.log(value1, value2);
      };

    return (
        <div className={s.login}>
            <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.logo_containe}>
                    <div className={s.logo}>
                    <img src='/logo.svg' alt="logo"/>
                    <img src="/solit-сlouds.svg" alt="solit-clouds"/>
                    </div>
                    <span>Besties</span>
                </div>
                
                <TextField key="login" label="Логин" margin='normal' variant="outlined" placeholder='Введите ваш логин' fullWidth={true}
                value={value1}
                onChange={handleChange1}
                error={error1}
                style={{ borderColor: (error1 || error3) ? 'red' : undefined }}
                helperText={error1 ? "Введите логин" : error3 ? "Неверный логин или пароль" : ""}/>

                <TextField key="password" label="Пароль" type="password" variant="outlined" placeholder='Введите ваш пароль' fullWidth={true}
                value={value2}
                onChange={handleChange2}
                error={error2}
                style={{ borderColor: (error2 || error3) ? 'red' : undefined }}
                helperText={error2 ? "Введите пароль" : error3 ? "Неверный логин или пароль" : ""}/>

                <button className={s.button} type='submit'>Войти</button>  
            </form>
        </div>   
     );
}
 
export default Auth;