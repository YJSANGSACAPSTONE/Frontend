import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Planner from './pages/Planner';
import Challenge from './pages/Challenge';
import ChallengeAll from './pages/ChallengeAll';
import ChallengeRead from './pages/ChallengeRead';
import ChallengeWrite from './pages/ChallengeWrite';
import Header from './components/Header';
import Footer from './components/Footer';
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
			
			<Route path="/planner" element={<Planner header={<Header/>} footer={<Footer/>} />}/>

			<Route path="/challenge" element={<Challenge header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challengeRead" element={<ChallengeRead header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challengeAll" element={<ChallengeAll header={<Header/>} footer={<Footer/>} />} />
			<Route path="/challengeWrite" element={<ChallengeWrite header={<Header/>} footer={<Footer/>} />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
