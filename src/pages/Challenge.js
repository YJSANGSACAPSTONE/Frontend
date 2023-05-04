import React,{ useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import Axios from "axios";
function Challenge(props){
    // const [challenges, setChallenges] = useState([]);
    const [mylist, setMylist] = useState([]);
    const [popularlist, setPopularlist] = useState([]);
    const [recentlist, setRecentlist] = useState([]);
    useEffect(()=>{
        Axios.get('http://localhost:8070/challenge/list')
		.then((res) => {
            console.log(res.data.mylist);
            setMylist(res.data.mylist);
            setPopularlist(res.data.popularlist);
            setRecentlist(res.data.recentlist);
        })
		.catch(error => console.log(error));
    }, [])
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
                                    <Link to="/challengeAll"><button class="allChallenge">전체 챌린지 보기</button></Link>
                                </div>
                                <div class="popular_challenge ch_lists">
                                    <div class="title">
                                        <p>인기 챌린지</p>
                                        <button class="btn" >+</button>
                                    </div>
                                    <div class="challenge_list">
                                        <ul>
                                            {Object.keys(popularlist).length > 0 ? (
                                                popularlist.map(popularlist => (
                                                    <li><Link to={`/challenge/${popularlist.c_id}`}><div><img src="./img/morning.png" alt="morning"/><p>{popularlist.c_name}</p></div></Link></li>
                                                ))
                                            ) : (
                                                <li><Link to="/challenge/3"><div></div></Link></li>
                                            )}
                                            {/* <li><Link to="/challenge/1"><div><img src="./img/morning.png" alt="morning"/><p>미라클 모닝</p></div></Link></li>
                                            <li><Link to="/challenge/2"><div></div></Link></li>
                                            <li><Link to="/challenge/3"><div></div></Link></li>
                                            <li><Link to="/challenge/4"><div></div></Link></li> */}
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
                                            {Object.keys(recentlist).length > 0 ? (
                                                recentlist.map(recentlist => (
                                                    <li><Link to={`/challenge/${recentlist.c_id}`}><div><img src="./img/morning.png" alt="morning"/><p>{recentlist.c_name}</p></div></Link></li>
                                                ))
                                            ) : (
                                                <li><Link to="/challenge/3"><div></div></Link></li>
                                            )}
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
                                            {Object.keys(mylist).length > 0 ? (
                                                mylist.map(mylist => (
                                                    <li><Link to={`/challenge/${mylist.c_id}`}><div><img src="./img/morning.png" alt="morning"/><p>{mylist.c_name}</p></div></Link></li>
                                                ))
                                            ) : (
                                                <li><Link to="/challenge/3"><div></div></Link></li>
                                            )}
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
                                            <li><Link to="/challenge/1"><div></div></Link></li>
                                            <li><Link to="/challenge/2"><div></div></Link></li>
                                            <li><Link to="/challenge/3"><div></div></Link></li>
                                            <li><Link to="/challenge/4"><div></div></Link></li>
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