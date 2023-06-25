import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Axios from "axios";
import Profile from '../components/Profile';
import Cookies from 'js-cookie';
function ChallengeVerify(props){

    const userInfo = JSON.parse(Cookies.get('userInfo'));
    const location = useLocation();
    const challenge = location.state?.challenge;
    console.log(challenge);
    if(!challenge.c_id){
        challenge.c_id = challenge.cid;
    }
    const navigate = useNavigate();
    const [challengeverify, setChallengeverify] = useState({
        c_id : challenge.c_id,
        u_id : userInfo.u_id,
        verifyPhoto : null
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "verifyPhoto") {
          setChallengeverify(prevState => ({ ...prevState, [name]: e.target.files[0] }));
        }
      };
    
    const MbChallenge = () => {
        navigate(`/challenge/${challenge.c_id}`, { state: { challenge } });
    }
    const verify = async () =>{

        try {
            const selectedFile = challengeverify.verifyPhoto;
            const maxSize = 5 * 1024 * 1024;
            const fileSize = selectedFile.size;
      
            if (fileSize > maxSize) {
              alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
              return;
            }
      
            const fileName = selectedFile.name;
            console.log(fileName);
            const res = await Axios.get('/api/s3upload/s3', {
              params: { fileName : fileName }
            });
            console.log(res.data);
            const encodedFileName = res.data.encodedFileName;
            const preSignedUrl = res.data.preSignedUrl;
            
            console.log("encodedFileName : "+encodedFileName);
            console.log("presignedUrl : "+preSignedUrl);
            console.log("selectedFile type : "+selectedFile.type);
            setChallengeverify(prevState=>({...prevState, ["verifyPhoto"] : encodedFileName}));
            
            await Axios.put(preSignedUrl, selectedFile, {
                headers: {
                    'Content-Type': selectedFile.type
                }
            });
            console.log('이미지 업로드 완료');

            
      
            console.log(challengeverify);
      
            await Axios.post('/api/challenge/verify', challengeverify);
      
            console.log('챌린지 등록 완료');
            navigate(`/profile/${userInfo.u_id}/myChallenge`);
          } catch (error) {
            console.error('이미지 업로드 오류:', error);
          }
        
    }; 
    useEffect(()=>{
        $("#verifyImg").click(function() {
            $("#verifyInput").trigger("click");
        });
        $("#verifyInput").change(function() {

            var reader = new FileReader();
            reader.onload = function(e) {
                // 선택한 파일의 데이터 URL을 가져와서 이미지의 src로 설정
                $("#verifyImg").attr("src", e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        });
    }, []);
    return(
        <>
            {props.header}
            <div id="challenge" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="challenge_read">
                                <div class="read_title">
                                    <img src="/img/flag.png" alt="flag" />
                                    <p>{challenge.c_name}</p>
                                </div>
                                <div class="read_info">
                                    <div class="verify_title">
                                        <h3>
                                            본인의 인증사진을 업로드해주세요.
                                            <br/>
                                            (양식에 맞춰 업로드해주세요)
                                        </h3>
                                    </div>
                                    <div class="verify_img">
                                        <img src={challengeverify.verifyPhoto ? URL.createObjectURL(challengeverify.verifyPhoto) : "/img/camera.png"} alt="camera" id="verifyImg"/>
                                        <input id="verifyInput" name="verifyPhoto" type="file" onChange={handleChange} />
                                    </div>
                                    <div class="verify_text">
                                        <h3>올바른 촬영 Tip</h3>
                                        <p>- <span>인증 목적에 맞게</span> 구도를 설정해주세요.</p>
                                        <p>- <span>밝은 배경에서</span>인증 장면을 촬영하세요.</p>
                                        <p>- 혹시 촬영이 안되신다면 <span>"휴대폰설정&lt;어플리케이션&lt;권한</span>에서 <span>카메라 허용</span>으로 선택해주세요."</p>
                                    </div>
                                </div>
                                <div class="read_content">
                                    <p>{challenge.c_content}</p>
                                </div>
                                <div class="read_btn">
                                    <button class="toListBtn" onClick={MbChallenge}>이전</button>
                                    <button onClick={verify}>인증</button>
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

export default ChallengeVerify;