import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Planner from './pages/Planner';
import Challenge from './pages/Challenge';
import ChallengeAll from './pages/ChallengeAll';
import ChallengeRead from './pages/ChallengeRead';
import ChallengeWrite from './pages/ChallengeWrite';
import ChallengeUpdate from './pages/ChallengeUpdate';
import ChallengeVerify from './pages/ChallengeVerify';
import ChallengeSignUp from './pages/ChallengeSignUp';
import Board from './pages/Board';
import BoardRead from './pages/BoardRead';
import BoardWrite from './pages/BoardWrite';
import BoardEdit from './pages/BoardEdit';
import UserProfile from './pages/UserProfile';
import ProfileInfo from './pages/ProfileInfo';
import Point from './pages/Point';
import MyChallenge from './pages/MyChallenge';
import Header from './components/Header';
import Footer from './components/Footer';
import KakaoLogin from './components/KakaoLogin';
import Quit from './components/Quit';
import PaymentHistory from './pages/PaymentHistory';
import JobComplete from './components/JobComplete';
import ZepVerify from './pages/ZepVerify';

import NotFound from './components/NotFound';


import Axios from "axios";
import $ from 'jquery';

function App() {
	const [user, setUser] = useState("");
	const [plans, setPlans]=useState([]);

	useEffect(()=>{
			// subFooter
			$(window).on('resize', updateSubFooterPosition);

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

			
	}, []);
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />

			<Route path="/signUp" element={<SignUp header={<Header/>} footer={<Footer/>} />} />
			
			<Route path="/planner" element={<Planner header={<Header/>} footer={<Footer/>} />}/>
			<Route path="/kakaoLogin" element={<KakaoLogin/>} />
			<Route path="/challenge" element={<Challenge header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challenge/:id" element={<ChallengeRead header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challengeAll" element={<ChallengeAll header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challengeWrite" element={<ChallengeWrite header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challenge/:id/challengeUpdate" element={<ChallengeUpdate header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challenge/:id/verify" element={<ChallengeVerify header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challenge/:id/signUp" element={<ChallengeSignUp header={<Header/>} footer={<Footer/>} />} />

			<Route path="/profile" element={<UserProfile header={<Header/>} footer={<Footer/>} />} />
			
			<Route path="/profile/:id/zep" element={<ZepVerify header={<Header/>} footer={<Footer/>} />} />
			<Route path="/profile/:id/info" element={<ProfileInfo header={<Header/>} footer={<Footer/>} />} />
			<Route path="/profile/:id/myChallenge" element={<MyChallenge header={<Header/>} footer={<Footer/>} />} />
			<Route path="/profile/:id/point" element={<Point header={<Header/>} footer={<Footer/>} />} />
			<Route path="/profile/:id/payList" element={<PaymentHistory header={<Header/>} footer={<Footer/>}/> }  />
			
			<Route path="/JobComplete" element={<JobComplete/>} />
			<Route path="/quit" element={<Quit header={<Header/>} footer={<Footer/>} />} />

			<Route path="/board" element={<Board header={<Header/>} footer={<Footer/>} />} />
			<Route path="/board/:id" element={<BoardRead header={<Header/>} footer={<Footer/>} />} />
			<Route path="/board/:id/edit" element={<BoardEdit header={<Header/>} footer={<Footer/>} />} />
			<Route path="/board/write" element={<BoardWrite header={<Header/>} footer={<Footer/>} />} />


			<Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
