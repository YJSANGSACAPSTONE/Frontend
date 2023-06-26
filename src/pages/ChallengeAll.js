import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import Axios from 'axios';
function ChallengeAll(props){

    const [recentlist, setRecentlist] = useState([]);

    const navigate = useNavigate();

    const MvRead = (challenge) => {
        navigate(`/challenge/${challenge.c_id}`, { state: { challenge } });
    }
    useEffect(()=>{
        Axios.get(`/api/challenge/list`).then((res)=>{
            console.log(res);
            setRecentlist(res.data.recentlist);
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
                                            {Object.keys(recentlist).length > 0 ? (
                                                recentlist.map(recentlist => (
                                                    <li onClick={() => MvRead(recentlist)}><div><img src={`${recentlist.c_thumbnails}`} alt="morning"/><p>{recentlist.c_name}</p></div></li>
                                                ))
                                            ) : (
                                                <li><div><p>등록된 챌린지가 없습니다.</p></div></li>
                                            )}
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