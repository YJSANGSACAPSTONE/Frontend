import React from 'react';
import { Link } from 'react-router-dom';

function BoardEdit(props){
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
                                            <img src="/img/profile.png" alt="profile"/>
                                            <p>@sinsung test</p>
                                        </div>
                                        <div class="pl_pro_text">
                                            <p>영진상사</p>
                                            <p>lv. 10</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li class="boardlist_area">
                                <div class="board_list">
                                    <button class="toListBtn" onClick={() => window.location.href='/board/1'}>이전</button>
                                    <ul>
                                        <li>
                                            <div class="list_title">
                                                <div class="title_pro">
                                                    <img src="/img/profile.png" alt="profile"/>
                                                    <h3>@youngjin</h3>
                                                </div>
                                                <input type="text" value="챌린지 세개 완료했다 ㅎㅎ 갓생 사는 중"/>
                                            </div>
                                            <textarea name="editorTxt" id="editorTxt" cols="30" rows="10">ㅈㄱㄴ 요즘 챌린지 완전 부시고 댕겨ㅎㅎㅎ 똑같은 하루라도 알차게 사는 기분들어서 진짜 갓생러됨 ㅠㅠ 재밌는 거 있으면 추천해주랑</textarea>
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

export default BoardEdit;