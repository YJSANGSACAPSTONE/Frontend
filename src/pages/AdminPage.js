import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
function AdminPage(props){
    
    useEffect(()=>{

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
                                                <img src="" alt="" />
                                                사용자 관리
                                            </p>
                                            <p>
                                                <img src="" alt="" />
                                                챌린지 인증관리
                                            </p>
                                            <p>
                                                <img src="" alt="" />
                                                게시판 관리
                                            </p>
                                            <p>
                                                <img src="" alt="" />
                                                트래픽 관리
                                            </p>
                                            <p>
                                                <img src="" alt="" />
                                                도서관 관리
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu_footer">
                                    <p>(전화이미지) 문의하기 : 010-1234-5678</p>
                                </div>
                            </li>
                            <li className="admin_main">
                                <div className="main_top">
                                    <p>김유현</p>
                                    <div>
                                        <button>연장/업그레이드</button>
                                        <button>나가기</button>
                                    </div>
                                </div>
                                <div className="main_middle">
                                    <div className="admin_graph">
                                        <div className="graph_area">
                                            <p className="graph_title">인증챌린지 통계</p>
                                            <div className="graph"></div>
                                        </div>
                                        <div className="graph_info">
                                            <p className="info_title">통계 요약</p>
                                            <p className="info_text">오늘 인증 수 : </p>
                                            <p className="info_text">주간 평균 수 : </p>
                                            <p className="info_text">전체 인증 수 : </p>
                                        </div> 
                                    </div>
                                    <div className="admin_verify">
                                        <div className="admin_title">
                                            <p>첼린지 인증관리</p>
                                            <p>+</p>
                                        </div>
                                        <div className="verify_top">
                                            <ul>
                                                <li>메뉴1</li>
                                                <li>메뉴2</li>
                                                <li>메뉴3</li>
                                                <li>메뉴4</li>
                                                <li>메뉴5</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>내용1</li>
                                                <li>내용2</li>
                                                <li>내용3</li>
                                                <li>내용4</li>
                                                <li>내용5</li>   
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="admin_post">
                                        <div className="admin_title">
                                            <p>게시판 관리</p>
                                            <p>+</p>
                                        </div>
                                        <div className="verify_top">
                                            <ul>
                                                <li>메뉴1</li>
                                                <li>메뉴2</li>
                                                <li>메뉴3</li>
                                                <li>메뉴4</li>
                                                <li>메뉴5</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>내용1</li>
                                                <li>내용2</li>
                                                <li>내용3</li>
                                                <li>내용4</li>
                                                <li>내용5</li>   
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="admin_user">
                                    <div className="admin_title">
                                            <p>회원 관리</p>
                                            <p>+</p>
                                        </div>
                                        <div className="verify_top">
                                            <ul>
                                                <li>메뉴1</li>
                                                <li>메뉴2</li>
                                                <li>메뉴3</li>
                                                <li>메뉴4</li>
                                                <li>메뉴5</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>내용1</li>
                                                <li>내용2</li>
                                                <li>내용3</li>
                                                <li>내용4</li>
                                                <li>내용5</li>   
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="admin_book">
                                        <div className="admin_title">
                                            <p>도서관 관리</p>
                                            <p>+</p>
                                        </div>
                                        <div className="verify_top">
                                            <ul>
                                                <li>메뉴1</li>
                                                <li>메뉴2</li>
                                                <li>메뉴3</li>
                                                <li>메뉴4</li>
                                                <li>메뉴5</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>내용1</li>
                                                <li>내용2</li>
                                                <li>내용3</li>
                                                <li>내용4</li>
                                                <li>내용5</li>   
                                            </ul>
                                        </div>
                                    </div>
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

export default AdminPage;