import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Profile from '../components/Profile';
import Cookies from 'js-cookie';
function UserProfile(props){
    const handleLogout = () => {
        Cookies.remove('userInfo');
        window.location.href='https://kauth.kakao.com/oauth/logout?client_id=87c054c34eca4ca3541ab083e086cd12&logout_redirect_uri=https://web.godsaengplanner.com';
    }
    return(
        <>
            {props.header}
            <div id="profile_content" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="profile_info">
                                <Link to="/adminPage"><div>관리자페이지</div></Link>
                                <Link to="/profile/1/info"><div>계정 정보</div></Link>
                                <Link to="/profile/1/zep"><div>ZEP ID 인증</div></Link>
                                <Link to="/profile/1/myChallenge"><div>마이 챌린지</div></Link>
                                <Link to="/profile/1/alram"><div>알람</div></Link>
                                <Link to="/profile/1/point"><div>포인트 충전</div></Link>
                                <Link to="/profile/1/PointPayList"><div>포인트 사용 내역</div></Link>
                                <Link to="/profile/1/payList"><div>결제 내역</div></Link>
                                {/* <Link to="https://kauth.kakao.com/oauth/logout?client_id=87c054c34eca4ca3541ab083e086cd12&logout_redirect_uri=https://web.godsaengplanner.com"><div>로그아웃</div></Link> */}
                                <button onClick={handleLogout}><div>로그아웃</div></button> {/* Modified logout button */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default UserProfile;