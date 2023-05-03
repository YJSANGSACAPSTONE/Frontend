import React from 'react';
import { Link } from 'react-router-dom';


function LoginPage(){

    const handleClick = (e) => {
        const KakaoLoginAPI = 'https://kauth.kakao.com/oauth/authorize?client_id=87c054c34eca4ca3541ab083e086cd12&redirect_uri=http://localhost:3000/kakaoLogin&response_type=code';
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