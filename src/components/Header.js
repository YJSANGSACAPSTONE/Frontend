import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import $ from 'jquery';
import jwt_decode from 'jwt-decode';
import Axios from "axios";

function Header(){
    const [userInfo, setUserInfo] = useState({
        u_id : "",
        u_nickname : "" ,
        u_content : "",
        u_zepid : "",
        userImg : "",
        u_level : 1,
        u_deposit : 0
    });
    const jwtToken = Cookies.get("accessTokenCookie");
    const refreshToken = Cookies.get("refreshTokenCookie");

    const decodedAccToken = jwt_decode(jwtToken);

    let u_id = decodedAccToken.userId;
    // let userRole = decodedAccToken.role;
    // let profile_image = decodedAccToken.profile_image;

    // 현재 URL 이 planner 일 때만 이 axios 통신 해서 쿠키에 사용자 관련 정보들을 집어넣을 수 있게 if 문으로 설정
    const currentURL = window.location.pathname;
    const handleButtonClick = () => {
        window.open('https://zep.us/play/8J6PRM', '_blank');
    };
    useEffect(()=>{
        Axios.get(`/api/user/readuser`,{
            headers : {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        .then((resInner)=>{
            // console.log(resInner);
            setUserInfo(resInner.data);
            Cookies.set('userInfo',JSON.stringify(resInner.data));
        })
        .catch((err)=>{
            console.log(err);
        });
    }, []);

    return (
        <div id="subHeader" class="container">
            <div class="container_inner">
                <div>
                    <ul>
                        <Link to="/planner">
                            <li class="sub_logo">
                                <p>갓생플래너</p>
                                <img src="/img/logo.png" alt="logo" />
                            </li>
                        </Link>
                        <li class="menuArea">
                            <ul class="mainMenu">
                                <li>
                                    <Link to="/planner">홈</Link>
                                </li>
                                <li>
                                    <Link to="/challenge">챌린지</Link>
                                    <ul class="subMenu">
                                        <li>
                                            <Link to="/challengeAll">전체 챌린지</Link>
                                        </li>
                                        {/* <li>
                                            <Link to={`/profile/${userInfo.u_id}/myChallenge`}>완료한 챌린지</Link>
                                        </li> */}
                                        <li>
                                            <Link to={`/profile/${userInfo.u_id}/myChallenge`}>마이 챌린지</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/board">게시판</Link>
                                    <ul class="subMenu">
                                        <li>
                                           <Link to="/board">전체 게시판</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/service">서비스 소개</Link>
                                    <ul class="subMenu">
                                        <li>
                                            <Link to="/service">메타버스 챌린지 소개</Link>
                                        </li>
                                        {/* <li>
                                            <Link to="/service/zepetto">제페토 소개</Link>
                                        </li>
                                        <li>
                                            <Link to="/service/intro">서비스 소개</Link>
                                        </li> */}
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/profile">마이페이지</Link>
                                    <ul class="subMenu">
                                        <li>
                                            <Link to={`/profile/${userInfo.u_id}/info`}>계정 정보</Link>
                                        </li>
                                        <li>
                                            <Link to={`/profile/${userInfo.u_id}/PointPayList`}>포인트 사용 내역</Link>
                                        </li>
                                        <li>
                                            <Link to={`/profile/${userInfo.u_id}/payList`}>결제 내역</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li class="sub_burger">
                            <button onClick={handleButtonClick}>메타버스로 이동</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;