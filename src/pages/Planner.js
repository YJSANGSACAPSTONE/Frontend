import React, { useState, useEffect, useRef }  from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Axios from "axios";

function Planner(props){
    const [plans, setPlans]=useState([]);
    const [title, setTitle] = useState("");
	const uploadInputRef = useRef(null);
	const thumbnailRef = useRef(null);
	const datePickerRef = useRef(null);

	const handleClick = (e) => {
		const id = e.currentTarget.classList[0].substr(8);
		const title = e.currentTarget.querySelector(".title").textContent;
		setTitle(title);
		const listModal = document.getElementById("listModal");
		listModal.style.display = "flex";
	};

    useEffect(() => {
		// 첫 페이지 로딩 후 Axios를 통해서 오늘 날짜 plan 받아오는 것
		Axios.get('/plan/api/dailyplan')
		.then(response => setPlans(response.data))
		.catch(error => console.log(error));


		const addTaskBtn = document.getElementById("addTaskBtn");
		const addTaskModal = document.getElementById("addTaskModal");		
		const closeModalBtn = document.getElementById("closeModalBtn");
		const addTaskForm = document.getElementById("addTaskForm");
		
		const listModalconfirmBtn = document.getElementById("listModalconfirmBtn");

		addTaskBtn.addEventListener("click", () => {
			addTaskModal.style.display = "flex";
		});		
		closeModalBtn.addEventListener("click", () => {
			addTaskModal.style.display = "none";
		});
		addTaskForm.addEventListener("submit", (event) => {
			event.preventDefault();
			addTaskModal.style.display = "none";
			// 추가할일 처리 로직 작성
		});

		// Planner event------------------------------------------------------------
		// div 요소에 datepicker 설정
		$("#datepickerDiv").click(function() {
			// Datepicker가 표시되어 있는지 체크
			if ($(".ui-datepicker").is(":visible")) {
				// 표시되어 있다면 숨김
				$("#datepickerDiv").text("달력 보기");
				$("#datepickerUI").hide();
			} else {
			// 표시되어 있지 않다면 표시
				$("#datepickerDiv").text("달력 숨기기");
				$("#datepickerUI").show();
			}

			$("#datepickerUI").datepicker({
				onSelect: function(dateText, inst) {
				// 선택한 날짜를 input 요소에 설정
				$("#selected-date-input").val(dateText);
				},
				dateFormat: "yy-mm-dd" // 날짜 형식 설정
			});
		});

		$("#listModal .confirmBtn button").click( () => {
			$("#listModal").css('display','none');
		});

		$("#listModal .editBtn").click( () => {
			$("#listModal").css('display','none');
			$("#editModal").css('display','flex');
		});

		$("#addTaskModal .editBtn").click( () => {
			$("#addTaskModal").css('display','none');
			$("#editModal").css('display','flex');
		});
		

		$(".alarmChkBtn").click( () => {
			$("#editModal").css("display","none");
		});

		// 알람기능 -----------------------------------------------------------------
		var alarmSound = document.getElementById("alarm-sound");
		var alarmInterval;
		var isAlarmSet = false;

		$("#alarm-time-display").on("click", function() {
			if (isAlarmSet) return;

			var alarmTime = prompt("알람 시간을 설정해주세요 (HH:mm)", "00 : 00");

			if (alarmTime !== null && alarmTime !== "") {
				$("#alarm-time-display").text(alarmTime);

				if (alarmTime === "00:00" || alarmTime === "00 : 00" ) {
					alert("알람 시간을 설정해주세요.");
					return;
				}

				$("#set-alarm").prop("disabled", true);
				$("#stop-alarm").prop("disabled", false);
				isAlarmSet = true;

				alarmInterval = setInterval(function() {
					var currentTime = new Date();
					var currentHour = currentTime.getHours();
					var currentMinute = currentTime.getMinutes();
					var alarmHour = parseInt(alarmTime.split(":")[0]);
					var alarmMinute = parseInt(alarmTime.split(":")[1]);

					if (currentHour === alarmHour && currentMinute === alarmMinute) {
						alarmSound.play();
						clearInterval(alarmInterval);
						$("#set-alarm").prop("disabled", false);
						$("#stop-alarm").prop("disabled", true);
						isAlarmSet = false;
					}
				}, 1000);
			}
		});

		// 알람기능 -----------------------------------------------------------------
		// Planner event------------------------------------------------------------

		// Planner Write------------------------------------------------------------
			// 파일 선택 시
			$("#thumbnail").click(function() {
				$("#uploadInput").trigger("click");
			});
			$("#uploadInput").change(function() {

				var reader = new FileReader();
				reader.onload = function(e) {
					// 선택한 파일의 데이터 URL을 가져와서 이미지의 src로 설정
					$("#thumbnail").attr("src", e.target.result);
				}
				reader.readAsDataURL(this.files[0]);
			});
			// Planner Write------------------------------------------------------------

		// 일정 입력 이벤트 트리거
		const handleClick = () => {
			let u_id = "sinsung";
			let p_title = $("input[name=p_title]").val();
			let p_content = $("textarea[name=p_content]").val();
			let p_category = $("select[name=p_category]").val();
			let p_startdate = $("input[name=p_startdate]").val();
			let p_enddate = $("input[name=p_enddate]").val();
			let p_starttime = $("input[name=p_starttime]").val();
			let p_endtime = $("input[name=p_endtime]").val();
			let p_remindornot = $("input[name=p_remindornot]").val();


			$("#addTaskModal").css('display','none');
			Axios.post("/plan/api/addplan", 
			{
				u_id : u_id,
				p_title : p_title,
				p_content : p_content,
				p_category : p_category,
				p_startdate : p_startdate,
				p_enddate : p_enddate,
				p_starttime : p_starttime,
				p_endtime : p_endtime,
				p_remindornot : p_remindornot
			})
			.then(response=>{
				alert(response);
			})
			.catch(error => {
				alert(error);
			});
		};
		
		$("#addTaskModal .confirmBtn button").on('click', handleClick);
		
		// 이 부분이 추가된 부분입니다.
		return () => {
			$("#addTaskModal .confirmBtn button").off('click', handleClick);
		};
	}, []);
    return (
        <>
            {props.header}
            <div id="planner_content" class="container">
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
                                        <li class="list_no_12" onClick={handleClick}>
                                            <div>04-19 <b>~</b> 04-19 </div>
                                            <div>
                                                <div class="time">17:48 ~ 20:00</div>
                                                <div class="title">아침 8시에 기상하기</div>
                                            </div>
                                        </li>
                                        
                                        <li class="list_no_2" onClick={handleClick}>
                                            <div>04-19 <b>~</b> 04-19 </div>
                                            <div>
                                                <div class="time">17:48 ~ 20:00</div>
                                                <div class="title">강아지 산책시키기</div>
                                            </div>
                                        </li>
                                        
                                        <li class="list_no_3" onClick={handleClick}>
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
                                                <h2>{title}</h2>
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
                                                        <button id="listModalconfirmBtn">확인</button>
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
                                                <form action="" method="post" id="addTaskForm" >
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
                                                            <button id="closeModalBtn">확인</button>
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
                        {/* plan_list 테스트 */}
                        <div>
                            <h1>Today's Plan List</h1>
                            {plans.length > 0 ? (
                                plans.map(plan => (
                                <div key={plan.p_id}>
                                    <h2>{plan.p_title}</h2>
                                    <p>{plan.p_content}</p>
                                    <p>Start Date: {plan.p_startdate}</p>
                                    <p>Start Time: {plan.p_starttime}</p>
                                    <p>End Date: {plan.p_enddate}</p>
                                    <p>End Time: {plan.p_endtime}</p>
                                    <p>Category: {plan.p_category}</p>
                                    <p>Remind: {plan.p_remindornot ? 'Yes' : 'No'}</p>
                                </div>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        {/* plan_list 테스트 */}
                    </div>
                </div>
            </div>
			{props.footer}
        </>
    )
}

export default Planner;