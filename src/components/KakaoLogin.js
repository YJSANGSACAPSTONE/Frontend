import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";

function KakaoLogin(){

    const [user, setUser] = useState([]);

    useEffect(()=>{
        const url = new URL(window.location.href);

        const code = url.searchParams.get("code");

        Axios.get(`http://localhost:8070/login?code=${code}`).then((res)=>{
            console.log(res.data)
        });
    }, []);

    return <div>KakaoLogin</div>;
}

export default KakaoLogin;