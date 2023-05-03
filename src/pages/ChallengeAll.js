import React from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
function ChallengeAll(props){
    return(
        <>
            {props.header}
            <div id="challenge" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="challenge_area">
                                <div class="ch_lists">
                                    <Link to="/challenge"><button class="allChallenge" onclick="location.href='challenge.html';">이전</button></Link>
                                </div>
                                <div class="popular_challenge ch_lists">
                                    <div class="title">
                                        <p>전체 챌린지</p>
                                    </div>
                                    <div class="challenge_list">
                                        <ul>
                                            <li><Link to="/challengeRead"><div><img src="./img/morning.png" alt="morning"/><p>미라클 모닝</p></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                            <li><Link to="/challengeRead"><div></div></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ch_list">
                                    <Link to="/challengeWrite"><button onclick="location.href='challenge_w.html';">새로운 챌린지 생성</button></Link>
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

export default ChallengeAll;