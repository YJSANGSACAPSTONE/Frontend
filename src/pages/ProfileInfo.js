import React, { useState, useEffect, useRef }  from 'react';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery';
import Axios from "axios";
import Cookies from 'js-cookie';

function ProfileInfo(props){

    const location = useLocation();
    const userData = location.state?.userData;

    const [u_id, setU_id] = useState(Cookies.get('userId'));
    const [u_nickname, setU_nickname] = useState("유현초등학교");
    const [u_zepid, setU_zepid] = useState("yuhyeonZep");
    const [u_content, setU_content] = useState("소개글입니다용 황주바보");
    
    const updateUser = () => {
        Axios.post('http://localhost:8070/user/updateuser',{
            u_id : u_id,
            u_nickname : u_nickname,
            u_zepid : u_zepid,
            u_content : u_content
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    };

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
                                        <label for="">닉네임</label><input type="text" name="u_nickname" value={u_nickname} onChange={(e)=>setU_nickname(e.target.value)} />
                                        <label for="">제페토아이디</label><input type="text" name="u_zepid" value={u_zepid} onChange={(e)=>setU_zepid(e.target.value)}/>
                                        <label for="">소개글</label><textarea name="u_content" id="" value={u_content} onChange={(e) => setU_content(e.target.value)} />
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
                                        <button>회원탈퇴</button>
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