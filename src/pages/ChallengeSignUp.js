import React, {useState, useEffect} from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Axios from "axios";
import Profile from '../components/Profile';
import Cookies from 'js-cookie';
function ChallengeSignUp(props){

    const location = useLocation();
    const history = useNavigate();
    const challenge = location.state?.challenge;
    const userInfo = JSON.parse(Cookies.get('userInfo'));
    console.log(challenge.c_fee);
    const challengePay = () => {
        const u_id = userInfo.u_id;
        if(window.confirm("정말 참가하시겠습니까?")){
            Axios.post(`http://localhost:8070/challenge/participate?uid=${u_id}`,{
                c_name : challenge.c_name,
                c_id : challenge.c_id,
                c_fee : challenge.c_fee
            })
            .then((res)=>{
                userInfo.u_deposit = parseInt(userInfo.u_deposit) - parseInt(challenge.c_fee);
                Cookies.set('userInfo',JSON.stringify(userInfo))
                history(`/profile/${challenge.c_id}/myChallenge`);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    useEffect(()=>{
        // axios 로 데이터 불러오기
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
                                    <h1>{challenge.c_name}</h1>
                                    <img src={`http://localhost:8070${challenge.c_thumbnails}`} alt="morning" />
                                    <div>
                                        <p>{challenge.c_content}</p>
                                        <p>시작일 : {challenge.c_startdate}</p>
                                        <p>종료일 : {challenge.c_enddate}</p>
                                    </div>
                                </div>
                                <div class="challenge_payment">
                                    <div>
                                        <h2>참가비</h2>
                                    </div>
                                    <div>
                                        <h2>{challenge.c_fee} 원</h2>
                                        <p>참가비가 높을수록 받는 상금도 많아져요!</p>
                                        <p>최소 1천원 ~ 최대 20만원</p>
                                    </div>
                                </div>

                                <div class="challenge_payback">
                                    <h3>예상 페이백 금액</h3>

                                    <p>챌린지 100% 성공</p><p>{challenge.c_fee}원</p> 
                                    <p>챌린지 85% 이상 성공</p><p>{challenge.c_fee*0.85}원</p>
                                    <p>챌린지 85% 미만 성공</p><p>성공률에 따라 다름</p>
                                    
                                </div>
                                <button type="button" onClick={challengePay} class="payBtn">참가하기</button>
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