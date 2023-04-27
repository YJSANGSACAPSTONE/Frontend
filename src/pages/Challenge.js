import React from 'react';
import { Link } from 'react-router-dom';

function Challenge(props){
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
                            <li class="challenge_area">
                                <div class="ch_lists">
                                    <Link to="/challengeAll"><button class="allChallenge">전체 챌린지 보기</button></Link>
                                </div>
                                <div class="popular_challenge ch_lists">
                                    <div class="title">
                                        <p>인기 챌린지</p>
                                        <button class="btn">+</button>
                                    </div>
                                    <div class="challenge_list">
                                        <ul>
                                            <li><Link to="/challengeRead"><div><img src="./img/morning.png" alt="morning"/><p>미라클 모닝</p></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="new_challenge ch_lists">
                                    <div class="title">
                                        <p>신규 챌린지</p>
                                        <button>+</button>
                                    </div>
                                    <div class="challenge_list">
                                        <ul>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="attend_challenge ch_lists">
                                    <div class="title">
                                        <p>참여중인 챌린지</p>
                                        <button>+</button>
                                    </div>
                                    <div class="challenge_list">
                                        <ul>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="success_challenge ch_lists">
                                    <div class="title">
                                        <p>성공 챌린지</p>
                                        <button>+</button>
                                    </div>
                                    <div class="challenge_list">
                                        <ul>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ch_list">
                                    <Link to="/challengeWrite"><button>새로운 챌린지 생성</button></Link>
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

export default Challenge;