import React from 'react';
import { Link } from 'react-router-dom';

function Profile(props){
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
                                            <img src="./img/profile.png" alt="profile"/>
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
                                    <form action="">
                                        <label for="">사진</label> <img id="profile_thumbnail" src="./img/profile.png" alt="profile"/> <input type="file" id="profileImage"/>
                                        <label for="">이메일</label><input type="text"/>
                                        <label for="">아이디</label><input type="text"/>
                                        <label for="">닉네임</label><input type="text"/>
                                        <label for="">제페토아이디</label><input type="text"/>
                                        <label for="">등급</label><input type="text"/>
                                        <label for="">레벨</label><input type="text"/>
                                        <label for="">예치금</label><input type="text"/>
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

export default Profile;