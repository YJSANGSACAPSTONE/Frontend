import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Axios from "axios";

export default function Profile(){
    const location = useLocation();
    const shouldRenderHotChart = location.pathname === "/board";
    const shouldRenderPlannerChart = location.pathname === "/planner";
    
    const [ranks, setRanks] = useState([]);

    const [userInfo, setUserInfo] = useState({
        u_id : "",
        u_nickname: "",
        u_level : "",
        u_deposit : ""
    });
    
    const [profile_image,setProfile_image] = useState("");
    useEffect(()=>{
        const jwtToken = Cookies.get("accessTokenCookie");
		const decodedAccToken = jwt_decode(jwtToken);
        const userInfoCookie = Cookies.get('userInfo');
        setProfile_image(decodedAccToken.profile_image);

        if (userInfoCookie) {
            setUserInfo(JSON.parse(userInfoCookie));
        } else {
            // 쿠키 값 없을 때 예외처리
            Axios.get(`http://localhost:8070/user/readuser`,{
                headers : {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then((resInner)=>{
                setUserInfo(resInner.data);
                resInner.data.userImg = profile_image;
                Cookies.set('userInfo',JSON.stringify(resInner.data));
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        
        // console.log(userInfo);
        // daliyplan 웹서버 통신으로 rank 정보 받아오기
        Axios.get(`http://localhost:8070/plan/dailyplan`,{
			headers : {
                'Authorization': `Bearer ${jwtToken}`
            }
		})
		.then((response) => {
			// console.log(response.data);
			setRanks(response.data.ranklist);
			
		})
		.catch(error => console.log(error));
    },[]);
    return (
        <li className="planner_profile">
            <Link to="/planner">
                <div>
                    <div className="pl_pro_img">
                        <img src={profile_image} alt="profile" />
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

            {shouldRenderPlannerChart && (
                <div className="planner_chart">
                    <div className="pc_top">
                        <ul>
                            <li className="pc_user"><p>All User Performance</p></li>
                            <li className="pc_score"><p>점수</p></li>
                            {/* <li className="pc_active"><p>마지막 활동일</p></li> */}
                        </ul>
                    </div>
                    <div className="pc_middle">
                        {ranks.length > 0 ? (
                            ranks.map((rank, index) => (
                                <ul>
                                  <li className="pc_user">
                                    {index + 1} &nbsp; <img src={rank.uphoto} alt="user" />
                                    <p>{rank.unickname}</p>
                                  </li>
                                  <li className="pc_score"><p>{rank.ulevel}</p></li>
                                </ul>
                              ))
                        ) : (
                            <p>랭킹이 없습니다.</p>
                        )}
                        

                        {/*
                        <ul>
                            <li className="pc_user">
                                1.<img src="/img/user.png" alt="user" />
                                <p>Yuhyeon Kim</p>
                            </li>
                            <li className="pc_score"><p>120</p></li>
                            <li className="pc_active"><p>2023-06-19</p></li>
                        </ul>
                        */}

                    </div>
                </div>
            )}
        </li>
    )
}