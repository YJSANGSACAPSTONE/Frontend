import React, { useState, useEffect, useRef }  from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Axios from "axios";
import Profile from '../components/Profile';
import { ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';

function Planner(props){
    const [plans, setPlans]=useState([]);
    const [title, setTitle] = useState("");
	const [pid,setPid] = useState("");
	const [uid, setUid] = useState("");
	const [content, setContent] = useState("");
	const [startdate, setStartdate] = useState("");
	const [enddate, setEnddate] = useState("");
	const [endtime, setEndtime] = useState("");
	const [starttime, setStarttime] = useState("");
	const [category, setCategory] = useState("");
	const [remind, setRemind] = useState("");

	// calendar
	var e = 100;
    var t = 2013;
    var n = 9;
    var r = [];
    var i = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    var s = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var o = ["#16a085", "#1abc9c", "#c0392b", "#27ae60", "#4c6ef5", "#f39c12", "#f1c40f", "#e67e22", "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];
    var u = $("#calendar");
    var a = u.find("#calendar_header");
    var f = u.find("#calendar_weekdays");
    var l = u.find("#calendar_content");

    b();
    c();
    
    a.find('i[class^="icon-chevron"]').on("click", function() {
        var e = $(this);
        var r = function(e) {
            n = e == "next" ? n + 1 : n - 1;
            if (n < 1) {
                n = 12;
                t--;
            } else if (n > 12) {
                n = 1;
                t++;
            }
            c();
        };
        if (e.attr("class").indexOf("left") != -1) {
            r("previous");
        } else {
            r("next");
        }
    });

    function c() {
        p();
        var e = h();
        var r = 0;
        var u = false;
        l.empty();
        while (!u) {
            if (s[r] == e[0].weekday) {
                u = true;
            } else {
                l.append('<div class="blank"></div>');
                r++;
            }
        }
        for (var c = 0; c < 42 - r; c++) {
            if (c >= e.length) {
                l.append('<div class="blank"></div>');
            } else {
                var v = e[c].day;
                var m = g(new Date(t, n - 1, v)) ? '<div class="today">' : "<div>";
                l.append(m + "" + v + "</div>");
            }
        }
        var y = o[n - 1];
        a.css("background-color", y).find("h1").text(i[n - 1] + " " + t);
        f.find("div").css("color", y);
        l.find(".today").css("background-color", y);
        d();
    }

    function h() {
        var e = [];
        for (var r = 1; r < v(t, n) + 1; r++) {
            e.push({
                day: r,
                weekday: s[m(t, n, r)]
            });
        }
        return e;
    }

    function p() {
        f.empty();
        for (var e = 0; e < 7; e++) {
            f.append("<div>" + s[e].substring(0, 3) + "</div>");
        }
    }

    function d() {
        var t;
        var n = $("#calendar").css("width", e + "%");
		var calendarHeaderWidth = parseInt(n.find("#calendar_header").css("width"));
        n.find(t = "#calendar_weekdays, #calendar_content").css("width", e + "%").find("div").css({
            width: e / 7 + "%",
            height: calendarHeaderWidth / 7 + "px",
            "line-height": calendarHeaderWidth / 7 + "px"
        });

		n.find("#calendar_header").css({
			height: parseFloat(calendarHeaderWidth) * (1 / 7) + "%"
		}).find('i[class^="icon-chevron"]').css("line-height", parseFloat(calendarHeaderWidth) * (1 / 7) + "%");
    }

    function v(e, t) {
        return (new Date(e, t, 0)).getDate();
    }

    function m(e, t, n) {
        return (new Date(e, t - 1, n)).getDay();
    }

    function g(e) {
        return y(new Date) == y(e);
    }

    function y(e) {
        return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
    }

    function b() {
        var e = new Date;
        t = e.getFullYear();
        n = e.getMonth() + 1;
    }

	// calendar
	
	const userInfo = JSON.parse(Cookies.get('userInfo'));

	const uploadInputRef = useRef(null);
	const thumbnailRef = useRef(null);
	const datePickerRef = useRef(null);

	const [selectedDate, setSelectedDate] = useState(new Date());
  	const [showDatePicker, setShowDatePicker] = useState(true);

	const toggleDatePicker = () => setShowDatePicker(!showDatePicker);
	// 달력 클릭했을 때 이벤트
	const handleChange = (date) => {
		setSelectedDate(date);

		// 선택된 날짜를 yyyy-mm-dd 형식으로 변환하여 input 요소에 설정
		const formattedDate = date ? date.toISOString().slice(0, 10) : ""; // ISO 형식 (yyyy-mm-dd)으로 변환
		const inputEl = document.getElementById("date-input");
		inputEl.value = formattedDate;	
	};
	const dateToString = (date) => {
		return date.toLocaleDateString("en-US");
	};
	  
	const deleteBtn = (e) => {
		Axios.get(`http://localhost:8070/plan/deleteplan/${pid}`).then((res)=>{
			Axios.get(`http://localhost:8070/plan/dailyplan?uid=${userInfo.u_id}`)
			.then((response) => {
				console.log(response);
				setPlans(response.data);
				$("#listModal").css('display','none');
			})
			.catch(error => console.log(error));
		})

	}
	
	const handleClick = (e) => {
		const id = e.currentTarget.key;
		const {
			pid,
			uid,
			title,
			content,
			startdate,
			enddate,
			endtime,
			starttime,
			category,
			remind
		  } = e.currentTarget.dataset;
		setPid(pid);
		setUid(uid);
		setContent(content);
		setStartdate(startdate);
		setEnddate(enddate);
		setEndtime(endtime);
		setStarttime(starttime);
		setCategory(category);
		setRemind(remind);
		setTitle(title);
		
		const listModal = document.getElementById("listModal");
		listModal.style.display = "flex";
	};

	const closePlan = () => {
		const listModal = document.getElementById("listModal");
		listModal.style.display = "none";
	}
	// 일정 수정 이벤트 트리거
	const updatePlan = () => {
		let u_id = userInfo.u_id;
		let u_title = $("input[name=u_title]").val();
		let u_content = $("textarea[name=u_content]").val();
		let u_category = $("select[name=u_category]").val();
		let u_startdate = $("input[name=u_startdate]").val();
		let u_enddate = $("input[name=u_enddate]").val();
		let u_starttime = $("input[name=u_starttime]").val();
		let u_endtime = $("input[name=u_endtime]").val();
		let u_remindornot = $("input[name=u_remindornot]").val() == "on" ? 1 : 0;

		$("#listModal").css('display','none');
			Axios.post("http://localhost:8070/plan/updateplan", 
			{
				u_id : u_id,
				p_id : pid,
				p_title : u_title,
				p_content : u_content,
				p_category : u_category,
				p_startdate : u_startdate,
				p_enddate : u_enddate,
				p_starttime : u_starttime,
				p_endtime : u_endtime,
				p_remindornot : u_remindornot
			})
			.then(response=>{
				console.log(response);
				Axios.get(`http://localhost:8070/plan/dailyplan?uid=${userInfo.u_id}`)
				.then(response => setPlans(response.data))
				.catch(error => console.log(error));
			})
			.catch(error => {
				alert(error);
			});
	}
	
    useEffect(() => {
		// 첫 페이지 로딩 후 Axios를 통해서 오늘 날짜 plan 받아오는 것
		Axios.get(`http://localhost:8070/plan/dailyplan?uid=${userInfo.u_id}`)
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
			// addTaskModal.style.display = "none";
		});
		addTaskForm.addEventListener("submit", (event) => {
			event.preventDefault();
			addTaskModal.style.display = "none";
			$("input[name=p_title]").val('');
			$("textarea[name=p_content]").val('');
			$("select[name=p_category]").val('');
			$("input[name=p_startdate]").val('');
			$("input[name=p_enddate]").val('');
			$("input[name=p_starttime]").val('');
			$("input[name=p_endtime]").val('');
			$("input[name=p_remindornot]").prop('checked', false);
			// 추가할일 처리 로직 작성
		});

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
		const addPlan = () => {
			let u_id = userInfo.u_id;
			let p_title = $("input[name=p_title]").val();
			let p_content = $("textarea[name=p_content]").val();
			let p_category = $("select[name=p_category]").val();
			let p_startdate = $("input[name=p_startdate]").val();
			let p_enddate = $("input[name=p_enddate]").val();
			let p_starttime = $("input[name=p_starttime]").val();
			let p_endtime = $("input[name=p_endtime]").val();
			let p_remindornot = $("input[name=p_remindornot]").val() == "on" ? 1 : 0;
			


			$("#addTaskModal").css('display','none');
			Axios.post("http://localhost:8070/plan/addplan", 
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
				console.log(response);
				Axios.get(`http://localhost:8070/plan/dailyplan?uid=${userInfo.u_id}`)
				.then((response) => {
					setPlans(response.data)
					$("input[name=p_title]").val('');
					$("textarea[name=p_content]").val('');
					$("select[name=p_category]").val('');
					$("input[name=p_startdate]").val('');
					$("input[name=p_enddate]").val('');
					$("input[name=p_starttime]").val('');
					$("input[name=p_endtime]").val('');
					$("input[name=p_remindornot]").prop('checked', false);
				})
				.catch(error => console.log(error));
			})
			.catch(error => {
				console.log(error);
			});
		};
		
		$("#addTaskModal .confirmBtn .addBtn").on('click', addPlan);
		
		// 이 부분이 추가된 부분입니다.
		return () => {
			$("#addTaskModal .confirmBtn .addBtn").off('click', addPlan);
		};
	}, []);
    return (
        <>
            {props.header}
            <div id="planner_content" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
							<li class="planner_challenge">
								<div class="challenge_list">
									<ul>
										<li>
											<div class="p_cl_title"><p>Miracle Morning</p></div>
											<div class="p_cl_progress">
												<div class="progress_area">
													<ProgressBar now={50} label={`50%`} className="my-progress-bar" />
												</div>
											</div>
											<div class="p_cl_date">
												<p>4/10 ~ 4/28</p>
											</div>
										</li>
										<li>
											<div class="p_cl_title"><p>Miracle Morning</p></div>
											<div class="p_cl_progress">
												<div class="progress_area">
													<ProgressBar now={50} label={`50%`} className="my-progress-bar" />
												</div>
											</div>
											<div class="p_cl_date">
												<p>4/10 ~ 4/28</p>
											</div>
										</li>
										<li>
											<div class="p_cl_title"><p>Miracle Morning</p></div>
											<div class="p_cl_progress">
												<div class="progress_area">
													<ProgressBar now={50} label={`50%`} className="my-progress-bar" />
												</div>
											</div>
											<div class="p_cl_date">
												<p>4/10 ~ 4/28</p>
											</div>
										</li>
										<li>
											<div class="p_cl_title"><p>Miracle Morning</p></div>
											<div class="p_cl_progress">
												<div class="progress_area">
													<ProgressBar now={50} label={`50%`} className="my-progress-bar" />
												</div>
											</div>
											<div class="p_cl_date">
												<p>4/10 ~ 4/28</p>
											</div>
										</li>
									</ul>
								</div>
							</li>
							{/* <li class="planner_space"></li> */}
                            <li class="planner_calendar">
								
								{/* <div id="datepickerDiv" onClick={toggleDatePicker}>
									{showDatePicker ? "달력 숨기기" : "달력 보기"} &nbsp;&nbsp; <input type="text" id="date-input" />
								</div> */}
								{/* {showDatePicker && (
									<DatePicker
									selected={selectedDate}
									onChange={(date) => {
										setSelectedDate(date);
										const formattedDate = date.toISOString().substring(0, 10);
										document.getElementById("date-input").value = formattedDate;
									  }}
									  dateFormat="yyyy-MM-dd"
									inline
									/>
								)} */}

								<div id="calendar">
									<div id="calendar_header"><i class="icon-chevron-left"></i>          <h1></h1><i class="icon-chevron-right"></i>         </div>
									<div id="calendar_weekdays"></div>
									<div id="calendar_content"></div>
								</div>
								
                            </li>
                            <li class="planner_inputArea">
                                <div class="planner_ls">
                                    <ul>
										{/* plan_list 테스트 */}
										{/* <div>
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
										</div> */}
										{/* plan_list 테스트 */}
										{plans.length > 0 ? (
											plans.map(plan => (
												<li 
													key={plan.p_id} 
													onClick={handleClick} 

													data-pid={plan.p_id}
													data-title={plan.p_title}
													data-uid={plan.u_id}
													data-content={plan.p_content}
													data-startdate={plan.p_startdate}
													data-enddate={plan.p_enddate}
													data-endtime={plan.p_endtime}
													data-startTime={plan.p_starttime}
													data-category={plan.p_category}
													data-remind={plan.p_remindornot}
												>
													<div>{plan.p_startdate} <b>~</b> {plan.p_enddate} </div>
													<div>
														<div class="time">{plan.p_starttime} ~ {plan.p_endtime}</div>
														<div class="title">{plan.p_title}</div>
													</div>
												</li>
												))
										) : (
											<h3>새로운 일정을 만들어보세요!</h3>
										)}
									
                                        <div class="btn_li">
                                            <button id="addTaskBtn">할 일 추가 <span>+</span> </button>
                                        </div>
                                        <div class="modal" id="listModal">
                                            <div class="modal-content">
                                                <h2><input type="text" name="u_title" value={title} onChange={(e)=>setTitle(e.target.value)} /></h2>
												<select name="u_category" id="">
													<option value="">카테고리 선택</option>
													<option value="일상">일상</option>
													<option value="운동">운동</option>
													<option value="공부">공부</option>
													<option value="취미">취미</option>
												</select>
                                                <div class="btn_area">
                                                    <button class="editBtn"><img src="./img/edit.png" alt="edit"/>시간수정</button>
                                                    <button onClick={deleteBtn}><img src="./img/bin.png" alt="bin"/>삭제하기</button>
                                                </div>
                                                <div class="text_area">
													<textarea name="u_content" id="" value={content} onChange={(e) => setContent(e.target.value)} />
                                                </div>
                                                <div class="add_date">
													<label for="s_date">시작일 : </label>
													<input type="date" id="s_date" name="u_startdate" value={startdate} onChange={(e) => setStartdate(e.target.value)} />
													<label for="e_date">종료일 : </label>
													<input type="date" id="e_date" name="u_enddate" value={enddate} onChange={(e) => setEnddate(e.target.value)}/>
												</div>
												<div class="add_time">
													<label for="s_time">시작시간 : </label>
													<input type="time" id="s_time" name="u_starttime" value={starttime} onChange={(e) => setStarttime(e.target.value)} />
													<label for="e_time">종료시간 : </label>
													<input type="time" id="e_time" name="u_endtime" value={endtime} onChange={(e) => setEndtime(e.target.value)} />
												</div>
                                                <div class="editReminder">
                                                    <div class="confirmBtn">
                                                        <button onClick={updatePlan} id="listModalconfirmBtn">확인</button>
														<button onClick={closePlan} id="listModalconfirmBtn">닫기</button>
                                                    </div>
                                                    <div class="reminder_btn">
                                                        <label for="chk_reminder"><img src="./img/reminders.png" alt="reminders"/>리마인더 설정</label>
                                                        <input type="checkbox" id="chk_reminder" name="u_remindornot" />
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
                                                        <option value="">카테고리 선택</option>
                                                        <option value="일상">일상</option>
                                                        <option value="운동">운동</option>
                                                        <option value="공부">공부</option>
                                                        <option value="취미">취미</option>
                                                    </select>
                                                    {/* <div class="btn_area">
                                                        <button class="editBtn"><img src="./img/edit.png" alt="edit"/>시간수정</button>
                                                        <button><img src="./img/bin.png" alt="bin"/>삭제하기</button>
                                                    </div> */}
                                                    <div class="text_area">
                                                        <textarea name="p_content" id="" ></textarea>
                                                    </div>
                                                    <div class="add_date">
                                                        <label for="s_date">시작일 : </label>
                                                        <input type="date" id="s_date" name="p_startdate"/>
                                                        <label for="e_date">종료일 : </label>
                                                        <input type="date" id="e_date" name="p_enddate"/>
                                                    </div>
                                                    <div class="add_time">
                                                        <label for="s_time">시작시간 : </label>
                                                        <input type="time" id="s_time" name="p_starttime"/>
                                                        <label for="e_time">종료시간 : </label>
                                                        <input type="time" id="e_time" name="p_endtime"/>
                                                    </div>
                                                    <div class="editReminder">
                                                        <div class="confirmBtn">
                                                            <button id="closeModalBtn" class="addBtn">확인</button>
															<button id="closeModalBtn">닫기</button>
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
			{props.footer}
        </>
    )
}

export default Planner;