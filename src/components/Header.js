import React,{ useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import $ from 'jquery';

function Header(){
    let userInfo;
    try {
        userInfo = JSON.parse(Cookies.get('userInfo'));
    } catch (e) {
        console.error('Error parsing userInfo cookie:', e);
    // 예외 처리 코드를 여기에 추가할 수 있습니다.
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
                                    <Link to="/">홈</Link>
                                </li>
                                <li>
                                    <Link to="/challenges">챌린지</Link>
                                    <ul class="subMenu">
                                        <li>
                                            <Link to="/challenges/all">전체 챌린지</Link>
                                        </li>
                                        <li>
                                            <Link to="/challenges/completed">완료한 챌린지</Link>
                                        </li>
                                        <li>
                                            <Link to="/challenges/my">마이 챌린지</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/boards">게시판</Link>
                                    <ul class="subMenu">
                                        <li>
                                           <Link to="/boards/free">자유 게시판</Link>
                                        </li>
                                        <li>
                                           <Link to="/boards/challenges">챌린지 게시판</Link>
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
                                    <Link to="/notices">공지사항</Link>
                                    <ul class="subMenu">
                                        <li>
                                            <Link to="/notices/notice">공지사항</Link>
                                        </li>
                                        <li>
                                            <Link to="/notices/contact">문의 및 고객센터</Link>
                                        </li>
                                        <li>
                                            <Link to="/notices/help">도움말</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/mypage">마이페이지</Link>
                                    <ul class="subMenu">
                                        <li>
                                            <Link to="/mypage/account">계정 정보</Link>
                                        </li>
                                        <li>
                                            <Link to="/mypage/point">포인트 충전</Link>
                                        </li>
                                        <li>
                                            <Link to="/mypage/payment">결제 내역</Link>
                                        </li>
                                        <li>
                                            <Link to="/logout">로그아웃</Link>
                                        </li>
                                        <li>
                                            <Link to="/mypage/withdraw">회원 탈퇴</Link>
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