import React,{ useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import Axios from "axios";
import Cookies from 'js-cookie';
function Challenge(props){
    // const [challenges, setChallenges] = useState([]);
    const userInfo = JSON.parse(Cookies.get('userInfo'));
    const [mylist, setMylist] = useState([]);
    const [popularlist, setPopularlist] = useState([]);
    const [recentlist, setRecentlist] = useState([]);

    const navigate = useNavigate();

    const MvRead = (challenge) => {
        navigate(`/challenge/${challenge.c_id}`, { state: { challenge } });
    }

    useEffect(()=>{
        Axios.get(`http://localhost:8070/challenge/list?uid=${userInfo.u_id}`)
		.then((res) => {
            console.log(res);
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
                                                    <li onClick={() => MvRead(popularlist)}><div><img src={`http://localhost:8070${popularlist.c_thumbnails}`} alt="morning"/><p>{popularlist.c_name}</p></div></li>
                                                ))
                                            ) : (
                                                <>
                                                <li><div><p>등록된 챌린지가 없습니다.</p></div></li>
                                                </>
                                            )}
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
                                                    <li onClick={() => MvRead(recentlist)}><div><img src={`http://localhost:8070${recentlist.c_thumbnails}`} alt="morning"/><p>{recentlist.c_name}</p></div></li>
                                                ))
                                            ) : (
                                                <li><div><p>등록된 챌린지가 없습니다.</p></div></li>
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
                                                    <li onClick={() => MvRead(mylist)}><div><img src={`http://localhost:8070${mylist.c_thumbnails}`} alt="morning"/><p>{mylist.c_name}</p></div></li>
                                                ))
                                            ) : (
                                                <li><div><p>참여중인 챌린지가 없습니다.</p></div></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                {/* <div class="success_challenge ch_lists">
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
                                </div> */}
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