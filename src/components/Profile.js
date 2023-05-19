import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Profile(){
    const location = useLocation();
    const shouldRenderHotChart = location.pathname === "/board";
    const userInfo = JSON.parse(Cookies.get('userInfo'));    
    return (
        <li className="planner_profile">
            <Link to="/planner">
                <div>
                    <div className="pl_pro_img">
                        <img src={userInfo.userImg} alt="profile" />
                    </div>
                    <div className="pl_pro_text">
                        <p>{userInfo.u_id}</p>
                        <p>{userInfo.u_nickname}</p>
                        <p>lv. {userInfo.u_level}</p>
                        <p><h3>보유 포인트 : {userInfo.u_deposit}</h3></p>
                    </div>
                </div>
            </Link>
            {shouldRenderHotChart && (
                <div class="hot_chart">
                    <h2>Hot 게시물</h2>
                    <ul>
                        <li>
                            <p>풋살 다녀왔습니다 ㅋㅋ</p>
                            <p>05/07 19:32</p>
                        </li>
                        <li>
                            <p>주식투자 챌린지 참가자 구함</p>
                            <p>04/29 10:12</p>
                        </li>
                        <li>
                            <p>매일 아침 코딩 챌린지해요</p>
                            <p>05/07 10:32</p>
                        </li>
                    </ul>
                </div>
            )}
        </li>
    )
}