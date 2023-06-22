import React from 'react';
import { Link } from 'react-router-dom';


function LoginPage(){

    const handleClick = (e) => {
        const KakaoLoginAPI = '/api/oauth2/authorize/kakao';
        window.open(KakaoLoginAPI, "_self");
    }; 

    return (
        <div id="header" class="container">
            <div class="container_inner">
                <div>
                    <ul>
                        <li class="header_logo">
                            <img src="./img/logo.png" alt="logo" />
                        </li>
                        <li class="header_title">
                            <p>갓생플래너</p>
                        </li>
                        <li class="header_login">
                            <img onClick={handleClick} src="./img/kakao_login.png" alt="kakao" />
                        </li>
                        <li>
                            <button class="signUpBtn" onClick={()=>window.location.href='/signUp'}>회원가입</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;