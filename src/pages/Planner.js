import React from 'react';

function Planner(){
    return (
        
	    <div id="planner_content" class="container">
            <div class="container_inner">
                <div>
                    <ul>
                        <li class="planner_profile">
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
                        </li>
                        <li class="planner_calendar">
                            <div id="datepickerDiv">
                                달력 보기
                            </div>
                            <input type="text" id="selected-date-input"/>
                            <div id="datepickerUI"></div>
                        </li>
                        <li class="planner_inputArea">
                            <div class="planner_ls">
                                <ul>
                                    
                                    <li class="list_no_12">
                                        <div>04-19 <b>~</b> 04-19 </div>
                                        <div>
                                            <div class="time">17:48 ~ 20:00</div>
                                            <div class="title">아침 8시에 기상하기</div>
                                        </div>
                                    </li>
                                    
                                    <li class="list_no_2">
                                        <div>04-19 <b>~</b> 04-19 </div>
                                        <div>
                                            <div class="time">17:48 ~ 20:00</div>
                                            <div class="title">강아지 산책시키기</div>
                                        </div>
                                    </li>
                                    
                                    <li class="list_no_3">
                                        <div>04-19 <b>~</b> 04-20 </div>
                                        <div>
                                            <div class="time">17:48 ~ 20:00</div>
                                            <div class="title">책 읽고 독후감 쓰기</div>
                                        </div>
                                    </li>
                                    <div class="btn_li">
                                        <button id="addTaskBtn">할 일 추가 <span>+</span> </button>
                                    </div>
                                    <div class="modal" id="listModal">
                                        <div class="modal-content">
                                            <h2>아침 8시에 기상하기</h2>
                                            <div class="btn_area">
                                                <button class="editBtn"><img src="./img/edit.png" alt="edit"/>시간수정</button>
                                                <button><img src="./img/bin.png" alt="bin"/>삭제하기</button>
                                            </div>
                                            <div class="text_area">
                                                <textarea name="" id="" >9시 수영 수업들으러 가야함!!</textarea>
                                            </div>
                                            <div class="etcClass">
                                                <p>기간 : 2023.04.15 ~ 2023.04.17</p>
                                                <p>시간 : 09:00 ~ 11:00</p>
                                            </div>
                                            <div class="editReminder">
                                                <div class="confirmBtn">
                                                    <button>확인</button>
                                                </div>
                                                <div class="reminder_btn">
                                                    <label for="chk_reminder"><img src="./img/reminders.png" alt="reminders"/>리마인더 설정</label>
                                                    <input type="checkbox" id="chk_reminder" name="chk_reminder" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="editModal" class="modal">
                                        <div class="modal-content">
                                            <h2>시간 설정</h2>
                                            <div id="alarm-wrapper">
                                                <div id="alarm-time-display">00 : 00</div>
                                            </div>
                                            <audio id="alarm-sound">
                                                <source src="./audio/alarm.mp3" type="audio/mpeg"/>
                                                Your browser does not support the audio element.
                                            </audio>

                                            <button class="alarmChkBtn">확인</button>
                                        </div>
                                    </div>
                                    <div id="addTaskModal" class="modal">
                                        <div class="modal-content">
                                            <form action="" method="post" >
                                                <label for="plan_title">제목</label>
                                                <input id="plan_title" type="text" name="p_title" />
                                                <select name="p_category" id="">
                                                    <option value="null">카테고리 선택</option>
                                                    <option value="일상">일상</option>
                                                    <option value="운동">운동</option>
                                                    <option value="공부">공부</option>
                                                    <option value="취미">취미</option>
                                                </select>
                                                <div class="btn_area">
                                                    <button class="editBtn"><img src="./img/edit.png" alt="edit"/>시간수정</button>
                                                    <button><img src="./img/bin.png" alt="bin"/>삭제하기</button>
                                                </div>
                                                <div class="text_area">
                                                    <textarea name="p_content" id="" ></textarea>
                                                </div>
                                                <div class="add_date">
                                                    <label for="s_date">시작일 : </label>
                                                    <input type="date" id="s_date" name="p_startdate"/>
                                                    <label for="e_date">종료일 : </label>
                                                    <input type="date" id="e_date" name="e_enddate"/>
                                                </div>
                                                <div class="add_time">
                                                    <label for="s_time">시작시간 : </label>
                                                    <input type="time" id="s_time" name="p_starttime"/>
                                                    <label for="e_time">종료시간 : </label>
                                                    <input type="time" id="e_time" name="e_endtime"/>
                                                </div>
                                                <div class="editReminder">
                                                    <div class="confirmBtn">
                                                        <button>확인</button>
                                                    </div>
                                                    <div class="reminder_btn">
                                                        <label for="chk_reminder_w"><img src="./img/reminders.png" alt="reminders"/>리마인더 설정</label>
                                                        <input type="checkbox" id="chk_reminder_w" name="p_remindornot" />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Planner;