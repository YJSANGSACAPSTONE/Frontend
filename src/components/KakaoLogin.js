import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import Cookies from 'js-cookie';

function KakaoLogin(){

    const [user, setUser] = useState([]);
    const history = useNavigate();

    useEffect(()=>{
        const url = new URL(window.location.href);
        
        const code = url.searchParams.get("code");
        console.log(url);
        Axios.get(`http://localhost:8070/login?code=${code}`).then((res)=>{
            console.log(res.data);
            setUser(res.data);
            Cookies.set('userId', res.data.userId);
            history('/signUp',{
                state : {userData : res.data}
            });
        });
    }, []);

    return <div>KakaoLogin</div>;
}

export default KakaoLogin;