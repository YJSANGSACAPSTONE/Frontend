import React,{ useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Profile from '../components/Profile';
function ChallengeRead(props){
    const location = useLocation();
    const challenge = location.state.challenge;
    const {id} = useParams();
    console.log(challenge);
    useEffect(()=>{
        
    }, [])

    return(
        <>
            {props.header}
            <div id="challenge" class="container" data-id={id}>
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="challenge_read">
                                <div class="read_title">
                                    <img src="/img/flag.png" alt="flag"/>
                                    <p>{challenge.c_name}</p>
                                </div>
                                <div class="read_info">
                                    <div class="info_img">
                                        <img src="/img/morning.png" alt="morning"/>
                                    </div>
                                    <div class="info_text">
                                        <p>최대 참가 인원 : {challenge.c_numberofparticipants}</p>
                                        <p>시작일 : {challenge.c_startdate}</p>
                                        <p>종료일 : {challenge.c_enddate}</p>
                                        {/* 일상 = 1, 운동 = 2, 공부 = 3 , 취미 = 4 */}
                                        <p>카테고리 : {
                                                        challenge.c_category==1 ? "일상" : 
                                                        challenge.c_category==2 ? "운동" :
                                                        challenge.c_category==3 ? "공부" :
                                                        challenge.c_category==4 ? "취미" :
                                                        "기타"
                                                        }
                                        </p>
                                        <p>참가금 : {challenge.c_fee}</p>
                                        <p>필수 등록 사진 개수 : {challenge.c_numberofphoto}개</p>
                                        <p>인증 타입(사진 or 챌린지) : {challenge.c_typeofverify==1?"사진":"챌린지"}</p>
                                        <p>빈도 타입 : {challenge.c_typeoffrequence==1?"하루에"+challenge.c_frequency+"번": challenge.c_frequency+"일에 한번"}</p>
                                    </div>
                                </div>
                                <div class="read_content">
                                    <p>{challenge.c_content}</p>
                                </div>
                                <div class="read_btn">
                                    <button class="toListBtn" onClick={() => window.location.href='/challenge'}>목록</button>
                                    <button onClick={()=>window.location.href=`/challenge/${challenge.c_id}/signUp`}>참가신청</button>
                                    <button onClick={() => window.location.href=`/challenge/${challenge.c_id}/verify`}>인증하기</button>
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