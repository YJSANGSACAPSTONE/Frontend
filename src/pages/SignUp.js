import React,{ useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Axios from "axios";
import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

// function decodeJWTToken(token) {
//     try {
//       const decoded = jwt.decode(token);
//       return decoded;
//     } catch (error) {
//       console.error('Error decoding JWT token:', error);
//       return null;
//     }
//   }

function SignUp(props){

    const history = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData;
    // axios 통신으로 넘어온 userData.userId를 매개변수로 controller 에서 db 접근해서 해당 아이디가 회원테이블에 존재여부에 따라 메인페이지 혹은 회원가입페이지로
    // Axios.get(`http://localhost:8070/check?uid=${userData.userId}`).then((res)=>{
    //     console.log(res.data);
    // });
    // axios 통신으로 넘어온 userData.userId를 매개변수로 controller 에서 db 접근해서 해당 아이디가 회원테이블에 존재여부에 따라 메인페이지 혹은 회원가입페이지로

    let accessToken = Cookies.get('accessTokenCookie');
    let refreshToken = Cookies.get('refreshTokenCookie');
    const decodedAccessToken = jwt_decode(accessToken);
    const decodedRefreshToken = jwt_decode(refreshToken)
    let u_id = decodedAccessToken.userId;
    let profile_image = decodedAccessToken.profile_image;
    console.log(decodedAccessToken);
    console.log(decodedRefreshToken);

    // addUser
    const addUser = () => {
        // let u_id = "";
        let u_nickname = $("input[name=u_nickname]").val();
        let u_zepid = "";
        let u_content = $("input[name=u_content]").val();

        Axios.post("http://localhost:8070/user/adduser", 
        {
            u_id : u_id,
            u_nickname : u_nickname,
            u_zepid : u_zepid,
            u_content : u_content,
            profile_image : profile_image,
        })
        .then(response=>{
            console.log(response);
            const userInfo = {
                // u_id ,
                u_nickname ,
                u_content,
                u_zepid,
                // userImg : userData.profileImageUrl,
                u_level : 1,
                u_deposit : 0
            };
            Cookies.set('userInfo',JSON.stringify(userInfo));
            Cookies.set('profile_image',profile_image);
            history('/planner');
        })
        .catch(error => {
            console.log(error);
        });
    };
    // addUser
    useEffect(()=>{
        // console.log(userData);
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
                                    {/* <img src={userData.profileImageUrl} alt="" /> */}
                                    <label htmlFor="signId">카카오아이디</label>
                                    <input type="text" id="signId" placeHolder="@abcdefg.com" value={u_id} name="u_id" />
                                    {/* <label htmlFor="signZep">ZEP 아이디</label>
                                    <input type="name" id="signZep" name="u_zepid" /> */}
                                    <label htmlFor="signName">닉네임</label>
                                    <input type="name" id="signName" name="u_nickname" />
                                    <label htmlFor="signContent">소개</label>
                                    <input type="text" id="signContent" name="u_content" />

                                    <button type="button" onClick={addUser}>가입하기</button>
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