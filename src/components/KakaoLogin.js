import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import Cookies from 'js-cookie';


// 현재 KakaoLogin.js 사용하지 않고있음 Loginpage 에서 바로 SignUp.js 로 넘어감
function KakaoLogin(){

    const history = useNavigate();

    useEffect(()=>{
        const url = new URL(window.location.href);
        
        const code = url.searchParams.get("code");
        
        // console.log(url);
        Axios.get(`/api/login?code=${code}`).then((res)=>{
            console.log(res.data);
            Axios.get(`/api/user/listuser?uid=${res.data.userId}`).
            then((resInner)=>{
                console.log(resInner);
                
                // 만약 첫 로그인일 경우 회원가입 페이지로 카카오 API 통신을 통해 받은 userId와 userProfileImg를 담아서 이동한다
                if(resInner.data == null){
                    history('/signUp',{
                        state : {userData : res.data}
                    });
                }else{
                    // 회원가입이 되어있는 사용자일 경우 쿠키를 저장해주고 메인페이지로 이동한다.
                    const userInfo = resInner.data;
                    userInfo.userImg = res.data.profileImageUrl;
                    Cookies.set('userInfo',JSON.stringify(userInfo));


                    history('/planner');
                }
            })
            .catch((err)=>{
                console.log(err);
            });
            
        });
    }, []);

    return <div>KakaoLogin</div>;
}

export default KakaoLogin;