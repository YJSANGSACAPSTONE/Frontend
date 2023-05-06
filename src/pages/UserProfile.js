import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Profile from '../components/Profile';
import Cookies from 'js-cookie';
function UserProfile(props){
    const handleLogout = () => {
        Cookies.remove('userInfo');
        window.location.href='https://kauth.kakao.com/oauth/logout?client_id=87c054c34eca4ca3541ab083e086cd12&logout_redirect_uri=http://localhost:3000/';
    }
    useEffect(()=>{
        function updateSubFooterPosition() {
            var subFooter = $('#subFooter');
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                // 스크롤이 없는 경우
                subFooter.css('position', 'fixed');
            } else {
                // 스크롤이 있는 경우
                subFooter.css('position', 'sticky');
            }
        }
        updateSubFooterPosition();
    }, []);
    return(
        <>
            {props.header}
            <div id="profile_content" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="profile_info">
                                <Link to="/profile/1/info"><div>계정 정보</div></Link>
                                <Link to="/profile/1/myChallenge"><div>마이 챌린지</div></Link>
                                <Link to="/profile/1/alram"><div>알람</div></Link>
                                <Link to="/profile/1/point"><div>포인트 충전</div></Link>
                                <Link to="/profile/1/payList"><div>결제 내역</div></Link>
                                <Link to="/profile/1/logout"><div onClick={handleLogout}>로그아웃</div></Link>
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