import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
import c3 from 'c3';
import Axios from "axios";

function AdminChallenge(props){
    

    useEffect(() => {
      Axios.get("http://localhost:8070/admin/challengelist")
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
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
                                            <p>검색된 사이트 <span>2</span></p>
                                            <p>+</p>
                                        </div>
                                        <div className="list_top">
                                            <ul>
                                                <li className="c_num">인증 번호</li>
                                                <li className="c_status">인증 상태</li>
                                                <li className="c_name">챌린지명</li>
                                                <li className="c_date">챌린지기간</li>
                                                <li className="c_verify">인증일자</li>
                                                <li className="c_uname">회원명</li>
                                                
                                            </ul>
                                        </div>
                                        <div className="list_middle">
                                            <ul>
                                                <li className="c_num">1</li>
                                                <li className="c_status">완료</li>
                                                <li className="c_name">1주1풋</li>
                                                <li className="c_date">2023-06-10 ~ 2023-06-20</li>
                                                <li className="c_verify">2023-06-12</li>
                                                <li className="c_uname">김유현</li>
                                                <li>
                                                    <button>인증</button>
                                                    <button>반려</button>
                                                    <button>상세보기</button>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li className="c_num">1</li>
                                                <li className="c_status">미완료</li>
                                                <li className="c_name">1주1풋</li>
                                                <li className="c_date">2023-06-10 ~ 2023-06-20</li>
                                                <li className="c_verify">2023-06-12</li>
                                                <li className="c_uname">김유현</li>
                                                <li>
                                                    <button>인증</button>
                                                    <button>반려</button>
                                                    <button>상세보기</button>
                                                </li>
                                            </ul>
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