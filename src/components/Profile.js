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
                    <img src="/img/profile.png" alt="profile" />
                    <p>{userInfo.u_id}</p>
                </div>
                <div className="pl_pro_text">
                    <p>{userInfo.u_nickname}</p>
                    <p>lv. {userInfo.u_level}</p>
                </div>
                </div>
            </Link>
            {shouldRenderHotChart && (
                <div class="hot_chart">
                    <h2>Hot 게시물</h2>
                    <ul>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                    </ul>
                </div>
            )}
        </li>
    )
}