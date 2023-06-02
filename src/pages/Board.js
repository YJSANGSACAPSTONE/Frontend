import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Profile from '../components/Profile';
import Axios from 'axios';
import Cookies from 'js-cookie';

function Board(props){

    const [boards, setBoards]=useState([]);
    const navigate = useNavigate();
    const userInfo = JSON.parse(Cookies.get('userInfo'));

    const MvRead = (board) => {
        navigate(`/board/${board.po_id}`, { state: { board } });
    }

    useEffect(()=>{
        Axios.get(`http://localhost:8070/post/list`)
        .then((res)=>{
            console.log(res);
            setBoards(res.data.dtoList);
        }) 
        .catch((err)=>{
            console.log(err);
        });
    }, []);
    return(
        <>
            {props.header}
            <div id="board" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="board_area">
                                <div class="search_area">
                                    <form action="">
                                        <select name="" id="">
                                            <option value="001">자유게시판</option>
                                            <option value="002">익명게시판</option>
                                            <option value="003">공지사항</option>
                                            <option value="004">미라클모닝</option>
                                            <option value="005">1일 20계단</option>
                                            <option value="006">산책위드망고</option>
                                        </select>
                                        <input type="text" placeholder="게시글 Search . . ." />
                                        
                                        <button type="button" onClick={()=>navigate(`/board/write`)}>
                                            게시글 작성하기 
                                            <img src="./img/edit.png" alt="edit"/>
                                        </button>
                                        
                                    </form>
                                </div>
                                <div class="board_list">
                                    <ul>
                                        {Object.keys(boards).length > 0 ? (
                                            boards.map(boards => (
                                                
                                                <li onClick={() => MvRead(boards)}>
                                                    <p><h3>{boards.po_title}</h3></p>
                                                    {/* <p>{boards.po_content}</p> */}
                                                    <div>1시간 전 &nbsp;&nbsp;&nbsp; 조회수 : {boards.po_hitcount}</div>
                                                    <div>
                                                        <img src="./img/message-icon.png" alt=""/>31
                                                        &nbsp;&nbsp;&nbsp; 
                                                        {boards.u_id}
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <>
                                            <li><div><p>등록된 게시글이 없습니다.</p></div></li>
                                            </>
                                        )}
                                        {/* <li onClick={() => MvRead(boards)}>
                                            <p class="list_title"><h3>챌린지 세개 완료했다 ㅎㅎ 갓생 사는 중</h3></p>
                                            <p>ㅈㄱㄴ 요즘 챌린지 완전 부시고 댕겨ㅎㅎㅎ 똑같은 하루라도 알차게 사는 기분들어서 진짜 갓생러됨 ㅠㅠ 재밌는 거 있으면 추천해주랑</p>
                                            <div>6분 전 &nbsp;&nbsp;&nbsp; 조회수 : 16</div>
                                            <div>
                                                <img src="./img/message-icon.png" alt=""/>13
                                                &nbsp;&nbsp;&nbsp; 
                                                @yeoungjin
                                            </div>
                                        </li> */}
                                        {/* <li onClick={() => window.location.href=`/board/2`}>
                                            <p><h3>풋살 다녀왔습니다 ㅋㅋ</h3></p>
                                            <p>상대팀 다 고수여서 힘들었네요. 율하 플랩풋볼 가실분 구함 ㅎㅎ</p>
                                            <div>1시간 전 &nbsp;&nbsp;&nbsp; 조회수 : 200</div>
                                            <div>
                                                <img src="./img/message-icon.png" alt=""/>31
                                                &nbsp;&nbsp;&nbsp; 
                                                @yuhyeon
                                            </div>
                                        </li>
                                        <li onClick={() => window.location.href=`/board/3`}>
                                            <p><h3>황주와 함께 주식투자 챌린지 참가중입니다.</h3></p>
                                            <p>매일 실력 올라가는 것 같아서 보람찹니다. 같이 참여하실 분 매일 오후 10시 zep 회의실 3번방으로 오세요</p>
                                            <div>1일 전 &nbsp;&nbsp;&nbsp; 조회수 : 20</div>
                                            <div>
                                                <img src="./img/message-icon.png" alt=""/>22
                                                &nbsp;&nbsp;&nbsp; 
                                                @sanghee@naver.com
                                            </div>
                                        </li> */}
                                    </ul>
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

export default Board;