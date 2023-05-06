import React,{useEffect, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import { ProgressBar } from "react-bootstrap";
import Axios from "axios";
import Cookies from 'js-cookie';
import $ from 'jquery';
function MyChallenge(props){
    const uid = JSON.parse(Cookies.get('userInfo')).u_id;
    const [mychallenge,setMychallenge] = useState([]);
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
        
        Axios.get(`http://localhost:8070/challenge/mychallenge?uid=${uid}`)
        .then((res)=>{
            setMychallenge(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });


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
                                    {mychallenge.length > 0 ? (
											mychallenge.map(challenge => (
												<div 
													key={challenge.p_id} 

													data-cid={challenge.cid}
													data-cname={challenge.cname}
													data-cstartdate={challenge.cstartdate}
													data-cenddate={challenge.cendate}
												>
													<img src="/img/morning_sun.png" alt="morning"/>
                                                    <div>
                                                        {challenge.cname}
                                                        <button onClick={()=>window.location.href=`/challenge/${challenge.cid}/verify`} class="myPageBtn">인증하기</button>
                                                    </div>
												</div>
												))
										) : (
											<p>Loading...</p>
										)}
                                        {/* <div>
                                            <img src="/img/morning_sun.png" alt="morning"/>
                                            <div>
                                                Miracle Morning
                                                <button onClick={()=>window.location.href='/challenge/1/verify'} class="myPageBtn">인증하기</button>
                                            </div>
                                        </div> */}
                                        {/* <div>
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
                                        </div> */}
                                    </div>
                                    <div class="ac_progress">
                                        {mychallenge.length > 0 ? (
											mychallenge.map(challenge => (
												<div>
                                                    {/* progress area */}
                                                    <div class="progress_area">
                                                        <p>0%</p>
                                                        <ProgressBar now={challenge.cvsuccesscount/challenge.totalcount*100} label={`${challenge.cvsuccesscount/challenge.totalcount*100}%`} className="my-progress-bar" /> 
                                                        <p>100%</p>
                                                    </div>
                                                    <p>{challenge.cstartdate} ~ {challenge.cenddate}</p>
                                                </div>
												))
										) : (
											<p>Loading...</p>
										)}
                                        {/* <div>
                                            <div class="progress_area">
                                                <p>0%</p>
                                                <ProgressBar now={now} label={`${now}%`} className="my-progress-bar" /> 
                                                <p>100%</p>
                                            </div>
                                            <p>4/10 ~ 4/28</p>
                                        </div> */}
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