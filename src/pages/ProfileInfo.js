import React, { useState, useEffect, useRef }  from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Axios from "axios";
import Cookies from 'js-cookie';
import Profile from '../components/Profile';
import jwt_decode from 'jwt-decode';

function ProfileInfo(props){
    const history = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData;
    const [profile_image,setProfile_image] = useState("");
    const userInfo = Cookies.get('userInfo');

    const jwtToken = Cookies.get("accessTokenCookie");
    const refreshToken = Cookies.get("refreshTokenCookie");
    const decodedAccToken = jwt_decode(jwtToken);

    const [u_info, setU_info] = useState(JSON.parse(userInfo));
    const {u_id, u_nickname, u_zepid, u_content, userImg, u_level, u_grade, u_img, u_successedchallenge,u_deposit} = u_info;

    // 오류 처리 및 액세스 토큰 재발급 함수
    async function handleTokenExpiration(error, refreshToken) {
        // 에러 메시지 확인
        if (error.message === 'Invalid token specified') {
        // 액세스 토큰 만료 오류인 경우
    
        // 리프레시 토큰을 사용하여 액세스 토큰 재발급
        try {
            const response = await Axios.post('/api/v1/token', null, {
            headers: {
                'Authorization-refresh': refreshToken
            }
            });
            const newAccessToken = response.data.accessToken;
    
            // 재발급된 액세스 토큰을 저장하고, 원래 요청을 재시도
            // 예: localStorage에 액세스 토큰을 저장한 후 다시 API 요청 수행
            // ...
    
        } catch (refreshError) {
            // 액세스 토큰 재발급 실패 처리
            console.error('Failed to refresh access token:', refreshError);
            // 예: 로그인 페이지로 리디렉션 또는 오류 메시지 표시 등
            // ...
        }
        } else {
        // 다른 오류 처리
        console.error('API request failed:', error);
        // 예: 오류 메시지 표시 등
        // ...
        }
    }

    const updateUser = async () => {
        console.log({
          u_id: u_id,
          u_nickname: u_nickname,
          u_zepid: u_zepid,
          u_content: u_content,
          profile_image: profile_image
        });
      
        try {
          await Axios.post(
            'http://localhost:8070/user/updateuser',
            {
              u_id: u_id,
              u_nickname: u_nickname,
              u_zepid: u_zepid,
              u_content: u_content,
              profile_image: profile_image
            },
            {
              headers: {
                'Authorization': `Bearer ${jwtToken}`
              }
            }
          );
      
          Cookies.set('userInfo', JSON.stringify(u_info));
          history('/profile');
        } catch (error) {
          // 오류 처리 및 액세스 토큰 재발급
          await handleTokenExpiration(error, refreshToken);
          // 재발급 후 원래 요청을 다시 시도
          // ...
        }
      };
    
    const deleteUser = () =>{
        if(window.confirm("정말 탈퇴하시겠습니까?")){
            window.location.href='https://kauth.kakao.com/oauth/logout?client_id=87c054c34eca4ca3541ab083e086cd12&logout_redirect_uri=http://localhost:3000/quit';
            const jwtToken = Cookies.get("accessTokenCookie");
            // 탈퇴는 현재 백엔드에서 준비중인 기능입니다
            Axios.get(`http://localhost:8070/user/deleteuser`,{
                headers : {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then((res) => {
            Cookies.remove('userInfo');
            console.log(res.data); // 처리 결과 출력
            history('/');
            })
            .catch((error) => {
                console.log(error); // 오류 발생 시 출력
            });
        }
        
    }
    

    useEffect(() => {
        setProfile_image(decodedAccToken.profile_image);
      }, []);

    return(
        <>
            {props.header}
            <div id="profile_content" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="profile">
                                <div class="profile_title"> 
                                    <h2>내 정보 수정</h2>
                                </div>
                                <div class="profile_img">
                                    <img src="" alt=""/>

                                </div>
                                <div class="form_area">
                                    <form>
                                        <div>
                                            <p>사진</p>
                                            <img id="profile_thumbnail" src={profile_image} alt="profile"/>
                                        </div> 
                                        <label for="">아이디</label><input type="text" name="u_id" value={u_id} />

                                        <label for="">닉네임</label>
                                        <input type="text" name="u_nickname" value={u_nickname} onChange={(e)=>setU_info({...u_info, u_nickname: e.target.value})} />

                                        <label for="">소개글</label>
                                        <textarea name="u_content" id="" value={u_content} onChange={(e) => setU_info({...u_info, u_content: e.target.value})} />
                                        <div>
                                            <p>등급</p>
                                            <p>일반회원</p>
                                        </div>
                                        <div>
                                            <p>레벨</p>
                                            <p>{u_level}</p>
                                        </div>
                                        <div>
                                            <p>예치금</p>
                                            <p>{u_deposit}</p>
                                        </div>
                                        <button className="updateUser" type="button" onClick={updateUser}>회원수정</button>
                                        <button className="deleteUser" type="button" onClick={deleteUser}>회원탈퇴</button>
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default ProfileInfo;