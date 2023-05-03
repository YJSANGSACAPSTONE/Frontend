import React from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
function BoardRead(props){

    function toBoard(e){
        window.location.href="/board";
        
    }

    return(
        <>
            {props.header}
            <div id="board" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="boardlist_area">
                                <div class="board_list">
                                    <button class="toListBtn" onClick={toBoard}>목록</button>
                                    <ul>
                                        <li>
                                            <div class="list_title">
                                                <div class="title_pro">
                                                    <img src="/img/profile.png" alt="profile" />
                                                    <h3>@youngjin</h3>
                                                    <p>04/17 16:59</p>
                                                </div>
                                                <h1>챌린지 세개 완료했다 ㅎㅎ 갓생 사는 중</h1>
                                            </div>
                                            <p>ㅈㄱㄴ 요즘 챌린지 완전 부시고 댕겨ㅎㅎㅎ 똑같은 하루라도 알차게 사는 기분들어서 진짜 갓생러됨 ㅠㅠ 재밌는 거 있으면 추천해주랑</p>
                                            <div>추천 : n &nbsp;&nbsp;&nbsp; <img src="/img/message-icon.png" alt="message-icon" />13 &nbsp;&nbsp;&nbsp; 6분 전 &nbsp;&nbsp;&nbsp; 조회수 : 16</div>
                                            <div>
                                                <a href="">삭제</a> &nbsp;&nbsp;&nbsp; <a href="/board/1/edit">수정</a>
                                            </div>
                                        </li>
                                        <li class="list_comment">
                                            <img src="/img/profile.png" alt="profile"/>
                                            <div class="comment_content">
                                                <p>@youngjin</p>
                                                <p>간단한 댓글 내용</p>
                                            </div>
                                            <div class="comment_info">
                                                <p><a href="">삭제</a> &nbsp; <a href="">수정</a> </p>
                                                <p>04/12 &nbsp; 16:32</p>
                                            </div>
                                        </li>
                                        <li class="comment_write">
                                            <img src="/img/profile.png" alt="profile" />
                                            <div class="comment_content">
                                                <p>@youngjin</p>
                                                <textarea name="" id="" cols="30" rows="10"></textarea>
                                            </div>
                                            <div class="comment_btn">
                                                <button>작성</button>
                                            </div>
                                        </li>
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

export default BoardRead;