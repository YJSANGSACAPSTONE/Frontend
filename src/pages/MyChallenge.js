import React,{useEffect, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import { ProgressBar } from "react-bootstrap";
import $ from 'jquery';
function MyChallenge(props){
    const now = 30;
    const now2 = 40;
    const now3 = 70;
    const now4 = 10;
    
    useEffect(()=>{
        function updateSubFooterPosition() {
            var subFooter = $('#subFooter');
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                // 스크롤이 없는 경우
                subFooter.css('position', 'fixed');
            } else {
                // 스크롤이 있는 경우
                subFooter.css('position', 'sticky');
            }
        }
        updateSubFooterPosition();
    
        
    }, []);
    return(
        <>
            {props.header}
            <div id="challenge" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="myChallenge">
                                <h1>마이 챌린지</h1>
                                <div class="attend_challenge">
                                    <h3>참가중인 챌린지</h3>
                                    <h3>진행 현황</h3>
                                    <div class="ac_list">
                                        <div>
                                            <img src="/img/morning_sun.png" alt="morning"/>
                                            <div>
                                                Miracle Morning
                                                <button onClick={()=>window.location.href='/challenge/1/verify'} class="myPageBtn">인증하기</button>
                                            </div>
                                        </div>
                                        <div>
                                            <img src="/img/open-book.png" alt="open-book"/>
                                            <div>
                                                Miracle Morning
                                                <button onClick={()=>window.location.href='/challenge/2/verify'} class="myPageBtn">인증하기</button>
                                            </div>
                                        </div>
                                        <div>
                                            <img src="/img/running.png" alt="running"/>
                                            <div>
                                                Miracle Morning
                                                <button onClick={()=>window.location.href='/challenge/3/verify'} class="myPageBtn">인증하기</button>
                                            </div>
                                        </div>
                                        <div>
                                            <img src="/img/cooking.png" alt="cooking"/>
                                            <div>
                                                Miracle Morning
                                                <button onClick={()=>window.location.href='/challenge/4/verify'} class="myPageBtn">인증하기</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ac_progress">
                                        <div>
                                            {/* progress area */}
                                            <div class="progress_area">
                                                <p>0%</p>
                                                <ProgressBar now={now} label={`${now}%`} className="my-progress-bar" /> 
                                                <p>100%</p>
                                            </div>
                                            <p>4/10 ~ 4/28</p>
                                        </div>
                                        <div>
                                            {/* progress area */}
                                            <div class="progress_area">
                                                <p>0%</p>
                                                <ProgressBar now={now2} label={`${now2}%`} className="my-progress-bar" />
                                                <p>100%</p>
                                            </div>
                                            <p>4/10 ~ 4/28</p>
                                        </div>
                                        <div>
                                            {/* progress area */}
                                            <div class="progress_area">
                                                <p>0%</p>
                                                <ProgressBar now={now3} label={`${now3}%`} className="my-progress-bar" />
                                                <p>100%</p>
                                            </div>
                                            <p>4/10 ~ 4/28</p>
                                        </div>
                                        <div>
                                            {/* progress area */}
                                            <div class="progress_area">
                                                <p>0%</p>
                                                <ProgressBar now={now4} label={`${now4}%`} className="my-progress-bar" />
                                                <p>100%</p>
                                            </div>
                                            <p>4/10 ~ 4/28</p>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default MyChallenge;