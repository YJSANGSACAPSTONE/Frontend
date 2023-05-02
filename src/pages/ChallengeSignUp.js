import React from 'react';
import { Link } from 'react-router-dom';

function ChallengeSignUp(props){
    return(
        <>
            {props.header}
            <div id="challenge" class="container">
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
                            <li class="challenge_pay">
                                <div class="challenge_info">
                                    <h1>미라클 모닝</h1>
                                    <img src="/img/morning.png" alt="morning" />
                                    <div>
                                        <p>매일 아침 6시 기상</p>
                                        <p>평일 매일 &nbsp;&nbsp; 00:00 ~ 24:00</p>
                                        <p>09.30(화) 종료</p>
                                    </div>
                                </div>
                                <div class="challenge_payment">
                                    <div>
                                        <p>참가비</p>
                                    </div>
                                    <div>
                                        <input type="text" /> 만원
                                        <p>참가비가 높을수록 받는 상금도 많아져요!</p>
                                        <p>최소 1만원 ~ 최대 20만원</p>
                                    </div>
                                </div>

                                <div class="challenge_payback">
                                    <h3>예상 페이백 금액</h3>

                                    <p>챌린지 100% 성공</p><p>20,007 ~ 20,500</p> 
                                    <p>챌린지 85% 이상 성공</p><p>10,000원</p>
                                    <p>챌린지 85% 미만 성공</p><p>성공률에 따라 다름</p>
                                    
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

export default ChallengeSignUp;