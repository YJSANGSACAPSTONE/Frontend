import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
import c3 from 'c3';
function AdminPage(props){
    const [chartData, setChartData] = useState([]); // 차트 데이터 상태 변수

    useEffect(() => {
      // 초기 차트 그리기
      drawChart(getTotalData());
  
      // 클릭 이벤트 핸들러 등록
      document.getElementById('today-btn').addEventListener('click', handleTodayClick);
      document.getElementById('weekly-btn').addEventListener('click', handleWeeklyClick);
      document.getElementById('total-btn').addEventListener('click', handleTotalClick);
    }, []);
  
    // 차트 그리기
  const drawChart = (data) => {
    c3.generate({
      bindto: '#chart',
      data: {
        x:'x',
        columns: data
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
          },
        },
      },
    });
  };
//   오늘 날짜에서 시간별 인증 횟수 통계 차트
  const drawChartToTime = (data) => {
    c3.generate({
      bindto: '#chart',
      data: {
        columns: data,
        type:'spline'
      },
    });
  };
  
    // 통계 요약 업데이트
    const updateSummary = (count) => {
      const todayCountElement = document.getElementById('today-count');
      const weekCountElement = document.getElementById('week-count');
      const totalCountElement = document.getElementById('total-count');
      todayCountElement.textContent = count;
      
    };
  
    // 오늘 인증 수 클릭 이벤트 핸들러
    const handleTodayClick = () => {
      const todayCount = 10; // 오늘 인증 수 (실제 데이터로 대체해야 함)
      updateSummary(todayCount);
      drawChartToTime(getTodayData());
    };
  
    // 주간 평균 수 클릭 이벤트 핸들러
    const handleWeeklyClick = () => {
      const weeklyAverageCount = 20; // 주간 평균 인증 수 (실제 데이터로 대체해야 함)
      updateSummary(weeklyAverageCount);
      drawChart(getWeeklyData());
    };
  
    // 전체 인증 수 클릭 이벤트 핸들러
    const handleTotalClick = () => {
      const totalCount = 100; // 전체 인증 수 (실제 데이터로 대체해야 함)
      updateSummary(totalCount);
      drawChart(getTotalData());
    };
  
    // 오늘 데이터 반환
    const getTodayData = () => {
      return [
        ['인증횟수', 0, 20,30, 40,45, 50,55, 60,65, 70,76,80,90,110, 120,200, 240, 260, 270, 280, 340, 350,370, 380, 400],
      ];
    };
  
    // 주간 데이터 반환
    const getWeeklyData = () => {
      return [
        ['x', '2013-01-01', '2013-01-07', '2013-01-14', '2013-01-21', '2013-01-28', '2013-01-31'],
        ['인증횟수', 30, 200, 100, 400, 150, 250],
      ];
    };
  
    // 전체 데이터 반환
    const getTotalData = () => {
      return [
        ['x', '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01', '2013-07-01', '2013-08-01', '2013-09-01', '2013-10-01', '2013-11-01', '2013-12-01'],
        ['인증횟수', 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250],
      ];
    };
    return(
        <>
            {props.header}
            <div id="adminPage" className="container">
                <div className="container_inner">
                    <div>
                        <ul>
                            <li className="admin_menu">
                                <div className="menu_top">
                                    <p>GODSAENG</p>
                                    <img src="/img/logo.png" alt="logo" />
                                </div>
                                <hr />
                                <div className="menu_middle">
                                    <div className="middle_top">
                                        <div>
                                            <img src="/img/edit1.png" alt="edit1" />
                                            <p>사이트 바로가기</p>
                                        </div>
                                    </div>
                                    
                                    <div className="middle_main">
                                        <div className="main_title">
                                            <p>사이트 관리</p>
                                            <p> + </p>
                                        </div>
                                        <div className="main_menu">
                                            <p>
                                                <img src="/img/user.png" alt="user" />
                                                사용자 관리
                                            </p>
                                            <p>
                                                <img src="/img/studying.png" alt="studying" />
                                                챌린지 인증관리
                                            </p>
                                            <p>
                                                <img src="/img/list.png" alt="list" />
                                                게시판 관리
                                            </p>
                                            {/* <p>
                                                <img src="/img/open-book.png" alt="" />
                                                트래픽 관리
                                            </p> */}
                                            <p>
                                                <img src="/img/open-book.png" alt="open-book" />
                                                도서관 관리
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu_footer">
                                    <p><img src="/img/bell.png" alt="bell" /> 문의하기 : 010-1234-5678</p>
                                </div>
                            </li>
                            <li className="admin_main">
                                <div className="main_top">
                                    <p className="top_title">갓생플래너</p>
                                    <div>
                                        <button>연장/업그레이드</button>
                                        <button>나가기</button>
                                    </div>
                                </div>
                                <div className="main_middle">
                                    <div className="admin_graph">
                                        <div className="graph_area">
                                            <p className="graph_title">인증챌린지 통계</p>
                                            <div id="chart" className="graph"></div>
                                        </div>
                                        <div className="graph_info">
                                            <p className="info_title">통계 요약</p>
                                            <p className="info_text">오늘 인증 수: <span id="today-count"></span></p>
                                            <p className="info_text">주간 평균 수: </p>
                                            <p className="info_text">전체 인증 수: </p>
                                            <div className="graph_btn">
                                                <button id="today-btn" onClick={() => handleTodayClick(chartData)}>
                                                    오늘 인증 수
                                                </button>
                                                <button id="weekly-btn" onClick={() => handleWeeklyClick(chartData)}>
                                                    주간 평균 수
                                                </button>
                                                <button id="total-btn" onClick={() => handleTotalClick(chartData)}>
                                                    전체 인증 수
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admin_verify">
                                        <div className="admin_title">
                                            <p>챌린지 인증관리</p>
                                            <p>+</p>
                                        </div>
                                        <div className="admin_body">
                                            <ul>
                                                <li className="ch_num">챌린지 번호</li>
                                                <li className="ch_name">챌린지명</li>
                                                <li className="ch_count">챌린지 참가인원</li>
                                                <li className="ch_all_count">인증 완료 개수/총 인증 개수</li>
                                                <li className="ch_btn">인증 이동</li>
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">미라클모닝</li>
                                                <li className="ch_count">20명</li>
                                                <li className="ch_all_count">10/20</li>
                                                <li className="ch_btn"><button>인증하기</button></li>   
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">미라클모닝</li>
                                                <li className="ch_count">20명</li>
                                                <li className="ch_all_count">10/20</li>
                                                <li className="ch_btn"><button>인증하기</button></li>   
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">미라클모닝</li>
                                                <li className="ch_count">20명</li>
                                                <li className="ch_all_count">10/20</li>
                                                <li className="ch_btn"><button>인증하기</button></li>   
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">미라클모닝</li>
                                                <li className="ch_count">20명</li>
                                                <li className="ch_all_count">10/20</li>
                                                <li className="ch_btn"><button>인증하기</button></li>   
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">미라클모닝</li>
                                                <li className="ch_count">20명</li>
                                                <li className="ch_all_count">10/20</li>
                                                <li className="ch_btn"><button>인증하기</button></li>   
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="admin_post">
                                        <div className="admin_title">
                                            <p>게시판 관리</p>
                                            <p>+</p>
                                        </div>
                                        <div className="admin_body">
                                            <ul>
                                                <li className="ch_num">게시글 번호</li>
                                                <li className="ch_name">게시글명</li>
                                                <li className="ch_count">게시글내용</li>
                                                <li className="ch_all_count">작성일자</li>
                                                <li className="ch_btn">조회수</li>
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">충격이망고 근황</li>
                                                <li className="ch_count">살찜 5kg 강아지...최초</li>
                                                <li className="ch_all_count">2023-06-18</li>
                                                <li className="ch_btn">28</li>   
                                            </ul>
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">충격이망고 근황</li>
                                                <li className="ch_count">살찜 5kg 강아지...최초</li>
                                                <li className="ch_all_count">2023-06-18</li>
                                                <li className="ch_btn">28</li>   
                                            </ul>
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">충격이망고 근황</li>
                                                <li className="ch_count">살찜 5kg 강아지...최초</li>
                                                <li className="ch_all_count">2023-06-18</li>
                                                <li className="ch_btn">28</li>   
                                            </ul>
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">충격이망고 근황</li>
                                                <li className="ch_count">살찜 5kg 강아지...최초</li>
                                                <li className="ch_all_count">2023-06-18</li>
                                                <li className="ch_btn">28</li>   
                                            </ul>
                                            <ul>
                                                <li className="ch_num">1</li>
                                                <li className="ch_name">충격이망고 근황</li>
                                                <li className="ch_count">살찜 5kg 강아지...최초</li>
                                                <li className="ch_all_count">2023-06-18</li>
                                                <li className="ch_btn">28</li>   
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <script src="https://d3js.org/d3.v5.min.js"></script>
            <script src="/c3/c3.min.js"></script>
            <link href="/c3/c3.css" rel="stylesheet"></link>

            {props.footer}
        </>
    )
}

export default AdminPage;