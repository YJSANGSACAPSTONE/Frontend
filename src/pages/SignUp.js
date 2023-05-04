import React,{ useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery';

function SignUp(props){

    const location = useLocation();
    const userData = location.state?.userData;

    useEffect(()=>{
        console.log(userData);
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
            <div id="sign_content" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <li class="sign_title">
                                <h1>회원가입</h1>
                            </li>
                            <li class="sign_form">
                                <form action="">
                                    <img src={userData.profileImageUrl} alt="" />
                                    <label htmlFor="signId">카카오아이디</label>
                                    <input type="text" id="signId" placeHolder="@abcdefg.com" value={userData.userId} />
                                    <label htmlFor="signPw">비밀번호</label>
                                    <input type="password" id="signPw" />
                                    <label htmlFor="signPwChk">비밀번호 확인</label>
                                    <input type="password" id="signPwChk" />
                                    <label htmlFor="signName">이름</label>
                                    <input type="name" id="signName" />
                                    <label htmlFor="signBirth">생년월일</label>
                                    <input type="text" id="signBirth" />
                                    <label htmlFor="signZep">ZEP ID</label>
                                    <input type="text" id="signZep" />

                                    <button>가입하기</button>
                                </form>
                            </li>
                        </ul>                      
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default SignUp;