import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import Profile from '../components/Profile';
function ChallengeSignUp(props){

    const [challenge,setChallenge] = useState({pay:"10,000"});
    
    useEffect(()=>{
        // axios 로 데이터 불러오기
        Axios.get('http://localhost:8080/challenge/getChallenge')
		.then(response => setChallenge(response.data))
		.catch(error => console.log(error));
    }, []);
    return(
        <>
            {props.header}
            <div id="challenge" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
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
                                        <h2>참가비</h2>
                                    </div>
                                    <div>
                                        <input type="readonly" value={challenge.pay} /> 원
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
                                <button class="payBtn">결재하기</button>
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