import React from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
function BoardWrite(props){
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
                                            <div class="write_cate">
                                                <select name="" id="">
                                                    <option value="001">자유게시판</option>
                                                    <option value="002">익명게시판</option>
                                                    <option value="003">공지사항</option>
                                                    <option value="004">미라클모닝</option>
                                                    <option value="005">1일 20계단</option>
                                                    <option value="006">산책위드망고</option>
                                                </select>
                                            </div>
                                            <div class="list_title">
                                                <div class="title_pro">
                                                    <img src="/img/profile.png" alt="profile"/>
                                                    <h3>@youngjin</h3>
                                                </div>
                                                <input type="text"/>
                                            </div>
                                            <textarea name="editorTxt" id="editorTxt" cols="30" rows="10"></textarea>
                                            <div>
                                                <label for="open">공개</label><input type="radio" id="open"/>
                                                <label for="close">비공개</label><input type="radio" id="close"/>
                                            </div>
                                            <div>
                                                <button class="toListBtn">등록</button>
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

export default BoardWrite;