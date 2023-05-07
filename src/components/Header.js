import React,{ useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import $ from 'jquery';

function Header(){
    const userInfo = JSON.parse(Cookies.get('userInfo'));
    useEffect(()=>{
        function updateSubFooterPosition() {
            console.log(123)
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