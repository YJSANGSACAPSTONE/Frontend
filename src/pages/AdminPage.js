import React,{useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
import c3 from 'c3';
import Axios from "axios";
import Cookies from 'js-cookie';

function AdminPage(props){
    const [chartData, setChartData] = useState([]); // 차트 데이터 상태 변수
    const jwtToken = Cookies.get("accessTokenCookie");
    const history = useNavigate();
    const [monthCount, setMonthCount] = useState("");
    const [averageCount, setAverageCount] = useState("");
    const [allCount, setAllCount] = useState("");

    useEffect(() =>{
        getTotalData();
    }, []);
    

    useEffect(() => {
      // 초기 차트 그리기
      
      drawChart(chartData);
  
      // 클릭 이벤트 핸들러 등록
      document.getElementById('today-btn').addEventListener('click', handleTodayClick);
      document.getElementById('weekly-btn').addEventListener('click', handleWeeklyClick);
      document.getElementById('total-btn').addEventListener('click', handleTotalClick);
    }, [chartData]);
  
    // 차트 그리기
//   const drawChart = (data) => {
//     c3.generate({
//       bindto: '#chart',
//       data: {
//         x:'x',
//         columns: data
//       },
//       axis: {
//         x: {
//             type: 'category',
//         },
//       },
//     });
//   };

    // 차트 그리기 ----------------------원본 양식
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
  
  
    // 오늘 인증 수 클릭 이벤트 핸들러
    const handleTodayClick = () => {
      drawChart(getTodayData());
    };
  
    // 주간 평균 수 클릭 이벤트 핸들러
    const handleWeeklyClick = () => {
      drawChart(getWeeklyData());
    };
  
    // 전체 인증 수 클릭 이벤트 핸들러
    const handleTotalClick = () => {
      drawChart(getTotalData());
    };

    // 전체 데이터 반환
    const getTotalData = async () => {
        const data = [];
        const dateData = ['x'];
        const randData = ['data1'];
        
        await Axios.get(`/api/admin/statistic`,{
			headers : {
				'Authorization': `Bearer ${jwtToken}`
			}
		})
        .then((res)=>{
            console.log(res.data.monthlyList);

            const monthlyList = res.data.monthlyList;
            Object.values(monthlyList).forEach((value, i) => {
                
                const startDate = new Date('2023-01-01');
                const date = new Date(startDate);

                date.setMonth(date.getMonth() + i); // 한 달 뒤의 일자로 설정
                date.setDate(1); // 해당 월의 첫째 날로 설정

                const formattedDate = formatDate(date, 'YYYY-MM-DD'); // 날짜를 원하는 형식으로 포맷

                dateData.push(formattedDate); // x축 데이터를 담는 배열에 날짜를 push
                randData.push(parseInt(value));
            });


            setMonthCount(randData[randData.length - 1]);
            const parsedRandData = randData.slice(1).map(value => parseInt(value));
            const average = parsedRandData.reduce((a, b) => a + b, 0) / parsedRandData.length;
            const total = parsedRandData.reduce((a, b) => a + b, 0);

            setAverageCount(Math.round(average));
            setAllCount(total);

        })
        .catch((err)=>{
            console.log(err);
            if (err.response && err.response.status === 403) {
                console.error("Access denied");
                alert("접근 권한이 없습니다.");
                history.push('/');
                // 특정 오류 처리 로직을 추가하세요.
              } else {
                console.error(err);
              }
        });

        data.push(dateData);
        data.push(randData);

        setChartData(data);   
    };
  
    // 오늘 데이터 반환
    const getTodayData = () => {
        const data = [];
        const dateData = ['x'];
        const randData = ['data1'];

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const startDate = new Date(year, month - 1, 1); // 현재 달의 1일로 시작
        const endDate = new Date(year, month, 0); // 현재 달의 마지막 날로 종료

        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            const currentDate = new Date(year, month - 1, i);
            const formattedDate = formatDate(currentDate, 'YYYY-MM-DD'); // 날짜를 원하는 형식으로 포맷
            dateData.push(formattedDate); // x축 데이터를 담는 배열에 날짜를 push
            randData.push(getRandomCount()); // 실제 차트 데이터에도 날짜와 랜덤한 인증 횟수를 push
        }

        data.push(dateData);
        data.push(randData);

        return data;
    };

        // 주간 데이터 반환
        const getWeeklyData = () => {
            const data = [];
            const dateData = ['x'];
            const randData = ['data1'];
            
            const currentDate = new Date(); // 현재 날짜
            const endDate = new Date(currentDate); // 현재 날짜를 기준으로 7일 전
            endDate.setDate(endDate.getDate() - 6);

            for (let i = 0; i < 7; i++) {
                const date = new Date(endDate);
                date.setDate(date.getDate() + i);
                const formattedDate = formatDate(date, 'YYYY-MM-DD'); // 날짜를 원하는 형식으로 포맷
                dateData.push(formattedDate); // x축 데이터를 담는 배열에 날짜를 push
                randData.push(getRandomCount()); // 실제 차트 데이터에도 날짜와 랜덤한 인증 횟수를 push
            }

            data.push(dateData);
            data.push(randData);
            return data;
        };


        // 날짜를 원하는 형식으로 변환
        const formatDate = (date, format) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            // 원하는 형식으로 날짜를 조합
            let formattedDate = format.replace('YYYY', year).replace('MM', month).replace('DD', day);

            return formattedDate;
        };
    
    // 1부터 500까지의 랜덤한 수 반환
    const getRandomCount = () => {
        return Math.floor(Math.random() * 500) + 1;
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
                                    <Link to="/planner">
                                        <p>GODSAENG</p>
                                        <img src="/img/logo.png" alt="logo" />
                                    </Link>
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
                                            <Link to="/adminUser">
                                              <p>
                                                    <img src="/img/user.png" alt="user" />
                                                    사용자 관리
                                              </p>
                                            </Link>
                                            <Link to="/adminChallenge">
                                              <p>
                                                  <img src="/img/studying.png" alt="studying" />
                                                  챌린지 인증관리
                                              </p>
                                            </Link>
                                            <Link to="/adminBoard">
                                              <p>
                                                  <img src="/img/list.png" alt="list" />
                                                  게시판 관리
                                              </p>
                                            </Link>
                                            <Link to="/adminTraffic">
                                                <p>
                                                    <img src="/img/open-book.png" alt="" />
                                                    트래픽 관리
                                                </p>
                                            </Link>
                                            <Link to="/adminLibrary">
                                              <p>
                                                  <img src="/img/open-book.png" alt="open-book" />
                                                  도서관 관리
                                              </p>
                                            </Link>
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
                                            <p className="info_text">이번 달 인증 수: <span>{monthCount}</span></p>
                                            <p className="info_text">평균 인증 수: <span>{averageCount}</span></p>
                                            <p className="info_text">전체 인증 수: <span>{allCount}</span></p>
                                            <div className="graph_btn">
                                                <button id="total-btn" onClick={() => handleTotalClick(chartData)}>
                                                    월별 인증 수
                                                </button>
                                                <button id="today-btn" onClick={() => handleTodayClick(chartData)}>
                                                    일간 인증 수
                                                </button>
                                                <button id="weekly-btn" onClick={() => handleWeeklyClick(chartData)}>
                                                    월별 매출
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
                                                <li className="ch_num">2</li>
                                                <li className="ch_name">저녁 등산</li>
                                                <li className="ch_count">10명</li>
                                                <li className="ch_all_count">5/10</li>
                                                <li className="ch_btn"><button>인증하기</button></li>   
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">3</li>
                                                <li className="ch_name">주간풋살</li>
                                                <li className="ch_count">9명</li>
                                                <li className="ch_all_count">3/9</li>
                                                <li className="ch_btn"><button>인증하기</button></li>   
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">4</li>
                                                <li className="ch_name">망고산책</li>
                                                <li className="ch_count">2명</li>
                                                <li className="ch_all_count">2/2</li>
                                                <li className="ch_btn"><button>인증하기</button></li>   
                                            </ul>
                                        </div>
                                        <div className="admin_text">
                                            <ul>
                                                <li className="ch_num">5</li>
                                                <li className="ch_name">개인공부1시간</li>
                                                <li className="ch_count">40명</li>
                                                <li className="ch_all_count">30/40</li>
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
                                                <li className="ch_count">살찜 5kg 강아지...산책</li>
                                                <li className="ch_all_count">2023-07-18</li>
                                                <li className="ch_btn">28</li>   
                                            </ul>
                                            <ul>
                                                <li className="ch_num">2</li>
                                                <li className="ch_name">풋살 챌린지 후기</li>
                                                <li className="ch_count">오늘 율하 갔다왔는데...</li>
                                                <li className="ch_all_count">2023-06-20</li>
                                                <li className="ch_btn">300</li>   
                                            </ul>
                                            <ul>
                                                <li className="ch_num">3</li>
                                                <li className="ch_name">미라클모닝 10일차</li>
                                                <li className="ch_count">뭔가 피부가 좋아졌어</li>
                                                <li className="ch_all_count">2023-06-10</li>
                                                <li className="ch_btn">400</li>   
                                            </ul>
                                            <ul>
                                                <li className="ch_num">4</li>
                                                <li className="ch_name">등산 관심있는 분</li>
                                                <li className="ch_count">매일 저녁 8시 출발합니다</li>
                                                <li className="ch_all_count">2023-06-9</li>
                                                <li className="ch_btn">100</li>   
                                            </ul>
                                            <ul>
                                                <li className="ch_num">5</li>
                                                <li className="ch_name">뽀모도로 공부법 추천</li>
                                                <li className="ch_count">5분도 괜찮은듯 시작 고고</li>
                                                <li className="ch_all_count">2023-06-05</li>
                                                <li className="ch_btn">200</li>   
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