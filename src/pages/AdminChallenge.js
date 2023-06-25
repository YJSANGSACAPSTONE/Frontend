import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
import c3 from 'c3';
import Axios from "axios";
import Cookies from 'js-cookie';

function AdminChallenge(props){

    const navigate = useNavigate();
    const jwtToken = Cookies.get("accessTokenCookie");
    const [challengeList, setChallengeList] = useState([]);
    useEffect(() => {
      Axios.get("/api/admin/challengelist",{
        headers : {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
      .then((res)=>{
        setChallengeList(res.data);
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
        if (err.response && err.response.status === 403) {
            console.error("Access denied");
            alert("접근 권한이 없습니다.");
            navigate.push('/');
            // 특정 오류 처리 로직을 추가하세요.
          } else {
            console.error(err);
          }
      });
    }, []);
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
                                            <p>
                                                <img src="/img/user.png" alt="user" />
                                                사용자 관리
                                            </p>
                                            <p className="active">
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
                                    <p className="top_title">챌린지 인증관리</p>
                                    <div>
                                        <button>연장/업그레이드</button>
                                        <button>나가기</button>
                                    </div>
                                </div>
                                <div className="main_challenge">
                                    <div className="challenge_title">
                                        <p>챌린지 목록</p>
                                        <p>본 챌린지 목록에 등록된 챌린지에서 발생한 인증들을 확인하고 승인할 수 있습니다.</p>
                                    </div>

                                    {/* <div className="challenge_search">
                                        <div>
                                            <select name="" id="">
                                                <option value="">모든 챌린지</option>
                                            </select>
                                        </div>
                                    </div> */}
                                    <div className="challenge_list">
                                        <div className="list_title">
                                            <p>현재 챌린지 개수 <span>{challengeList.length}</span></p>
                                            <p>+</p>
                                        </div>
                                        <div className="list_top">
                                            <ul>
                                                <li className="c_num">챌린지 번호</li>
                                                <li className="c_name">챌린지명</li>
                                                <li className="c_cnt">참가 인원</li>
                                                <li className="c_type">인증 타입</li>
                                                <li className="c_date">챌린지기간</li>
                                                
                                            </ul>
                                        </div>
                                        <div className="list_middle">

                                            {challengeList.length > 0 ? (
                                                challengeList.map(challengeList => (
                                                    <ul key={challengeList.c_id}>
                                                        <li className="c_num">{challengeList.c_id}</li>
                                                        <li className="c_name">{challengeList.c_name}</li>
                                                        <li className="c_cnt">{challengeList.c_numberofparticipants}</li>
                                                        <li className="c_type">{challengeList.c_typeofverify == 1 ? "메타버스 챌린지" : "일반 사진인증 챌린지"}</li>
                                                        <li className="c_date">{challengeList.c_startdate} ~ {challengeList.c_enddate}</li>
                                                        <li>
                                                            <button onClick={()=>navigate(`/adminChallengeDetail/${challengeList.c_id}`)}>관리</button>
                                                            <button>상세보기</button>
                                                        </li>
                                                    </ul>
                                                    ))
                                            ) : (
                                                <h3>새로운 일정을 만들어보세요!</h3>
                                            )}
                                            {/* <ul>
                                                <li className="c_num">챌린지 번호</li>
                                                <li className="c_name">챌린지명</li>
                                                <li className="c_cnt">참가 인원</li>
                                                <li className="c_type">인증 타입</li>
                                                <li className="c_date">챌린지기간</li>
                                                <li>
                                                    <button>관리</button>
                                                    <button>상세보기</button>
                                                </li>
                                            </ul> */}
                                        </div>
                                        <div className="list_paging">
                                            <ul>
                                                <li>1</li>
                                                <li>2</li>
                                                <li>3</li>
                                                <li>4</li>
                                                <li>5</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="admin_copyright">
                                        <p>(주)영진상사 | 010-1234-1234 | 대구광역시 북구 복현로 35 | 사업자 등록번호 : 000-0000 | 통신판매업신고 : 0000-xxxx-000000</p>
                                        <p>대표 : 심상희 | 개인정보책임자 : 김유현 이메일 : yeungjin@naver.com</p>
                                        <p>Made by 👨‍💻 Yuhyeon Kim</p>
                                        <div className="copy_use">
                                            <p>갓생플래너 이용약관</p>
                                            <p>이용약관</p>
                                            <p>개인정보 수집 및 이용동의</p>
                                            <p>도움말</p>
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

export default AdminChallenge;