import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

function Board(props){

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
            <div id="board" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <li class="planner_profile">
                                <Link to="/profile">
									<div>
										<div class="pl_pro_img">
											<img src="./img/profile.png" alt="profile"/>
											<p>@sinsung test</p>
										</div>
										<div class="pl_pro_text">
											<p>영진상사</p>
											<p>lv. 10</p>
										</div>
									</div>
								</Link>
                                <div class="hot_chart">
                                    <h2>Hot 게시물</h2>
                                    <ul>
                                        <li>
                                            <p>간단한 내용</p>
                                            <p>04/12 16:32</p>
                                        </li>
                                        <li>
                                            <p>간단한 내용</p>
                                            <p>04/12 16:32</p>
                                        </li>
                                        <li>
                                            <p>간단한 내용</p>
                                            <p>04/12 16:32</p>
                                        </li>
                                        <li>
                                            <p>간단한 내용</p>
                                            <p>04/12 16:32</p>
                                        </li>
                                        <li>
                                            <p>간단한 내용</p>
                                            <p>04/12 16:32</p>
                                        </li>
                                        <li>
                                            <p>간단한 내용</p>
                                            <p>04/12 16:32</p>
                                        </li>
                                    </ul>
                                </div>
                            </li>
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
                                        <button type="button" onClick={()=> window.location.href='/board/write'}>
                                            게시글 작성하기 
                                            <img src="./img/edit.png" alt="edit"/>
                                        </button>
                                    </form>
                                </div>
                                <div class="board_list">
                                    <ul>
                                        <li onClick={() => window.location.href=`/board/1`}>
                                            <p class="list_title"><h3>챌린지 세개 완료했다 ㅎㅎ 갓생 사는 중</h3></p>
                                            <p>ㅈㄱㄴ 요즘 챌린지 완전 부시고 댕겨ㅎㅎㅎ 똑같은 하루라도 알차게 사는 기분들어서 진짜 갓생러됨 ㅠㅠ 재밌는 거 있으면 추천해주랑</p>
                                            <div>6분 전 &nbsp;&nbsp;&nbsp; 조회수 : 16</div>
                                            <div>
                                                <img src="./img/message-icon.png" alt=""/>13
                                                &nbsp;&nbsp;&nbsp; 
                                                @youngjin
                                            </div>
                                        </li>
                                        <li onClick={() => window.location.href=`/board/2`}>
                                            <p><h3>챌린지 세개 완료했다 ㅎㅎ 갓생 사는 중</h3></p>
                                            <p>ㅈㄱㄴ 요즘 챌린지 완전 부시고 댕겨ㅎㅎㅎ 똑같은 하루라도 알차게 사는 기분들어서 진짜 갓생러됨 ㅠㅠ 재밌는 거 있으면 추천해주랑</p>
                                            <div>6분 전 &nbsp;&nbsp;&nbsp; 조회수 : 16</div>
                                            <div>
                                                <img src="./img/message-icon.png" alt=""/>31
                                                &nbsp;&nbsp;&nbsp; 
                                                @youngjin
                                            </div>
                                        </li>
                                        <li onClick={() => window.location.href=`/board/3`}>
                                            <p><h3>챌린지 세개 완료했다 ㅎㅎ 갓생 사는 중</h3></p>
                                            <p>ㅈㄱㄴ 요즘 챌린지 완전 부시고 댕겨ㅎㅎㅎ 똑같은 하루라도 알차게 사는 기분들어서 진짜 갓생러됨 ㅠㅠ 재밌는 거 있으면 추천해주랑</p>
                                            <div>6분 전 &nbsp;&nbsp;&nbsp; 조회수 : 16</div>
                                            <div>
                                                <img src="./img/message-icon.png" alt=""/>22
                                                &nbsp;&nbsp;&nbsp; 
                                                @youngjin
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

export default Board;