import React,{ useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import $ from 'jquery';

function Header(){
    let userInfo;

    try {
    userInfo = JSON.parse(Cookies.get('userInfo'));
    } catch (error) {
    // 예외 처리 코드
    console.error('userInfo가 존재하지 않거나 파싱할 수 없습니다.', error);
    // userInfo를 기본값으로 설정하거나 다른 처리를 수행할 수 있습니다.
    // 예를 들어, userInfo를 빈 객체로 초기화하려면 다음과 같이 할 수 있습니다.
    userInfo = {};
    }
    // useEffect(()=>{
    //     function updateSubFooterPosition() {
    //         var subFooter = $('#subFooter');
    //         if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
    //             // 스크롤이 없는 경우
    //             subFooter.css('position', 'fixed');
    //         } else {
    //             // 스크롤이 있는 경우
    //             subFooter.css('position', 'sticky');
    //         }
    //     }
    //     updateSubFooterPosition();
    // }, []);
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
                                        <li>
                                            <Link to={`/profile/${userInfo.u_id}/myChallenge`}>완료한 챌린지</Link>
                                        </li>
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
                                    <Link to="/services">서비스 소개</Link>
                                    <ul class="subMenu">
                                        <li>
                                            <Link to="/services/meta">메타버스 챌린지 소개</Link>
                                        </li>
                                        <li>
                                            <Link to="/services/zepetto">제페토 소개</Link>
                                        </li>
                                        <li>
                                            <Link to="/services/intro">서비스 소개</Link>
                                        </li>
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
                            <span></span>
                            <span></span>
                            <span></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;