import React from 'react';
import { Link } from 'react-router-dom';

function ChallengeRead(props){
    return(
        <>
            {props.header}
            <div id="challenge" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <li class="planner_profile">
                                <Link to="/planner">
                                <div>
                                    <div class="pl_pro_img">
                                        <img src="/img/profile.png" alt="profile" />
                                        <p>@sinsung test</p>
                                    </div>
                                    <div class="pl_pro_text">
                                        <p>영진상사</p>
                                        <p>lv. 10</p>
                                    </div>
                                </div>
                                </Link>
                            </li>
                            <li class="challenge_read">
                                <div class="read_title">
                                    <img src="/img/flag.png" alt="flag"/>
                                    <p>Miracle Morning</p>
                                </div>
                                <div class="read_info">
                                    <div class="info_img">
                                        <img src="/img/morning.png" alt="morning"/>
                                    </div>
                                    <div class="info_text">
                                        <p>참가 인원 : 10 / 3</p>
                                        <p>시작일 : 2023-04-17</p>
                                        <p>종료일 : 2023-04-20</p>
                                        <p>카테고리 : 기상</p>
                                        <p>참가금 : 5,000</p>
                                        <p>필수 등록 사진 개수 : 2개</p>
                                        <p>인증 타입(사진 or 챌린지) : 사진</p>
                                        <p>빈도 타입 : 하루에 N번</p>
                                    </div>
                                </div>
                                <div class="read_content">
                                    <p>아침에 일어나서 사진 찍는게 어려운 일 일까요?! 일단 저는 어렵습니다...</p>
                                </div>
                                <div class="read_btn">
                                    <button class="toListBtn" onClick={() => window.location.href='/challenge'}>목록</button>
                                    <button>참가신청</button>
                                    <button onClick={() => window.location.href='/challenge/1/verify'}>인증하기</button>
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

export default ChallengeRead;