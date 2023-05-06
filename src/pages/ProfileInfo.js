import React, { useState, useEffect, useRef }  from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Axios from "axios";
import Cookies from 'js-cookie';

function ProfileInfo(props){
    const history = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData;
    const userInfo = Cookies.get('userInfo');

    const [u_info, setU_info] = useState(JSON.parse(userInfo));

    const {u_id, u_nickname, u_zepid, u_content} = u_info;
    const updateUser = () => {
        Axios.post('http://localhost:8070/user/updateuser',{
            u_id : u_id,
            u_nickname : u_nickname,
            u_zepid : u_zepid,
            u_content : u_content
        })
        .then((res)=>{
            const newUserInfo = {
                u_id: u_id,
                u_nickname: u_nickname,
                u_zepid: u_zepid,
                u_content: u_content
            };
            console.log(newUserInfo);
            Cookies.set('userInfo', JSON.stringify(newUserInfo));
            history('/profile');
        })
        .catch((err)=>{
            console.log(err)
        })
    };
    
    const deleteUser = () =>{
        Axios.get(`http://localhost:8070/user/deleteuser?uid=${u_id}`)
        .then((res) => {
           console.log(res.data); // 처리 결과 출력
           history('/');
        })
        .catch((error) => {
            console.log(error); // 오류 발생 시 출력
        });
    }

    useEffect(()=>{

    }, []);

    return(
        <>
            {props.header}
            <div id="profile_content" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <li class="planner_profile">
                                <Link to="/profile">
                                    <div>
                                        <div class="pl_pro_img">
                                            <img src="/img/profile.png" alt="profile"/>
                                            <p>@sinsung test</p>
                                        </div>
                                        <div class="pl_pro_text">
                                            <p>영진상사</p>
                                            <p>lv. 10</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
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
                                            <img id="profile_thumbnail" src="/img/profile.png" alt="profile"/>
                                        </div> 
                                        <label for="">아이디</label><input type="text" name="u_id" value={u_id} />

                                        <label for="">닉네임</label>
                                        <input type="text" name="u_nickname" value={u_nickname} onChange={(e)=>setU_info({...u_info, u_nickname: e.target.value})} />

                                        <label for="">ZEP아이디</label>
                                        <input type="text" name="u_zepid" value={u_zepid} onChange={(e)=>setU_info({...u_info, u_zepid: e.target.value})}/>

                                        <label for="">소개글</label>
                                        <textarea name="u_content" id="" value={u_content} onChange={(e) => setU_info({...u_info, u_content: e.target.value})} />
                                        <div>
                                            <p>등급</p>
                                            <p>일반회원</p>
                                        </div>
                                        <div>
                                            <p>레벨</p>
                                            <p>10</p>
                                        </div>
                                        <div>
                                            <p>예치금</p>
                                            <p>10,000</p>
                                        </div>
                                        <button type="button" onClick={updateUser}>회원수정</button>
                                        <button type="button" onClick={deleteUser}>회원탈퇴</button>
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