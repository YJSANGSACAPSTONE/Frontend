import React,{useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
import c3 from 'c3';
import Axios from "axios";
import Cookies from 'js-cookie';

function AdminChallengeDetail(props){
    const jwtToken = Cookies.get("accessTokenCookie");
    const [challengeDetailList, setChallengeDetailList] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부
    const [selectedChallenge, setSelectedChallenge] = useState(null); // 선택된 챌린지

    const {id} = useParams();


    useEffect(() => {
        verifyList();
    }, []);
    
    // 팝업 열기
    const openPopup = (challenge) => {
        setSelectedChallenge(challenge);
        setShowPopup(true);
    };
    
    const verifyList = () => {
        Axios.get(`/api/admin/verifylist/${id}`,{
			headers : {
				'Authorization': `Bearer ${jwtToken}`
			}
		})
        .then((res)=>{
            setChallengeDetailList(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            // 임시로 데이터가 없어 500에러 났을 때 리스트 비워주기
            setChallengeDetailList([]);
            console.log(err);
        });
    }
    const verifyButton = (cvid) => {
        Axios.get(`/api/admin/verifythischallenge/${cvid}`,{
			headers : {
				'Authorization': `Bearer ${jwtToken}`
			}
		})
        .then((res)=>{
            console.log(res.data);
            setShowPopup(false);
            verifyList();
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    // 팝업 닫기
    const closePopup = () => {
        setShowPopup(false);
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
                                        <p>미라클 모닝</p>
                                        <p>미라클 모닝에 참가한 참가자들의 인증 정보를 확인 및 승인/반려 할 수 있습니다.</p>
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
                                            <p>현재 인증 개수 <span>{challengeDetailList.length}</span></p>
                                            <p>+</p>
                                        </div>
                                        <div className="list_top">
                                            <ul>
                                                <li className="c_num">챌린지 번호</li>
                                                <li className="c_name">챌린지 인증번호</li>
                                                <li className="c_cnt">챌린지 인증시간</li>
                                                <li className="c_type">유저 아이디</li>
                                                <li className="c_date">썸네일</li>
                                                
                                            </ul>
                                        </div>
                                        <div className="list_middle">

                                            {challengeDetailList.length > 0 ? (
                                                challengeDetailList.map(challengeDetailList => (
                                                    <ul key={challengeDetailList.cid}>
                                                        <li className="c_num">{challengeDetailList.cid}</li>
                                                        <li className="c_name">{challengeDetailList.cvid}</li>
                                                        <li className="c_cnt">{challengeDetailList.cvtime}</li>
                                                        <li className="c_type">{challengeDetailList.uid}</li>
                                                        <li className="c_date">
                                                            <img src={`${challengeDetailList.cvphoto}`} alt="cvphoto"/>
                                                        </li>
                                                        <li>
                                                            <button>인증</button>
                                                            <button>반려</button>
                                                            <button onClick={() => openPopup(challengeDetailList)}>상세보기</button>
                                                        </li>
                                                    </ul>
                                                    ))
                                            ) : (
                                                <ul>
                                                    <li>...</li>
                                                </ul>
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
                                    <div className="admin_popup" style={{ display: showPopup ? 'flex' : 'none' }}>
                                        <div className="popup_inner">
                                        <div className="popup_header">
                                            <h3>상세보기</h3>
                                            <button className="close_button" onClick={closePopup}>닫기</button>
                                        </div>
                                        <div className="popup_content">
                                            <h4>인증이름</h4>
                                            {/* <img src={selectedChallenge?.c_verificationphoto} alt="인증사진" /> */}
                                            <img src={`${selectedChallenge?.cvphoto}`} alt="cvphoto"/>
                                            {/* 기타 정보들 */}
                                        </div>
                                        <div className="popup_footer">
                                            <button onClick={()=> verifyButton(selectedChallenge?.cvid)}>승인</button>
                                            <button>반려</button>
                                        </div>
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

export default AdminChallengeDetail;