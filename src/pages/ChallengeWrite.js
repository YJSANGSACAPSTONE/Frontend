import React, { useState, useEffect, useRef }  from 'react';
import $ from 'jquery';
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
function ChallengeWrite(props){
    const history = useNavigate();

    const [challenge, setChallenge] = useState({
        c_name: "",
        c_numberofparticipants: 1,
        c_startdate: "",
        c_enddate: "",
        c_category: 1,
        c_fee: 0,
        c_numberofphoto: 0,
        c_typeofverify: 1,
        c_typeoffrequency: 1,
        c_frequency: "",
        c_score: 0,
        c_content: "",
        thumbnail: null,
      });
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "thumbnail") {
          setChallenge(prevState => ({ ...prevState, [name]: e.target.files[0] }));
        } else if (name === "c_typeofverify" || name === "c_typeoffrequency") {
            setChallenge(prevState => ({ ...prevState, [name]: parseInt(value) }));
          } else {
            setChallenge(prevState => ({ ...prevState, [name]: value }));
          }
      };

      
    const addChallenge = async (challengeData) =>{
        try {
            const selectedFile = challengeData.thumbnail;
            const maxSize = 5 * 1024 * 1024;
            const fileSize = selectedFile.size;
      
            if (fileSize > maxSize) {
              alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
              return;
            }
      
            const filename = selectedFile.name;
      
            const res = await Axios.get('/api/s3/url', {
              params: { filename },
            });
      
            const encodedFileName = res.data.encodedFileName;
            const presignedUrl = res.data.presignedUrl;
      
            await Axios.put(presignedUrl, selectedFile);
            console.log('이미지 업로드 완료');
      
            const formData = new FormData();
            formData.append('thumbnail', encodedFileName);
            formData.append('c_name', challengeData.c_name);
            formData.append('c_content', challengeData.c_content);
            formData.append('c_startdate', challengeData.c_startdate);
            formData.append('c_enddate', challengeData.c_enddate);
            formData.append('c_numberofparticipants', challengeData.c_numberofparticipants);
            formData.append('c_category', challengeData.c_category);
            formData.append('c_introduction', challengeData.c_introduction);
            formData.append('c_fee', challengeData.c_fee);
            formData.append('c_numberofphoto', challengeData.c_numberofphoto);
            formData.append('c_typeofverify', challengeData.c_typeofverify);
            formData.append('c_typeoffrequency', challengeData.c_typeoffrequency);
            formData.append('c_frequency', challengeData.c_frequency);
            formData.append('c_score', challengeData.c_score);
      
            console.log(challengeData);
      
            await Axios.post('/api/challenge/addchallenge', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
      
            console.log('챌린지 등록 완료');
            history('/challenge');
          } catch (error) {
            console.error('이미지 업로드 오류:', error);
          }
    }

    useEffect(()=>{
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
                                    <img src="./img/flag.png" alt="flag"/>
                                    <p>챌린지명 : <input type="text" name="c_name" value={challenge.c_name} onChange={handleChange} /></p>
                                </div>
                                <div class="read_info">
                                    <div class="info_img">
                                        <img id="thumbnail" src={challenge.thumbnail ? URL.createObjectURL(challenge.thumbnail) : "./img/upload.png"} alt="morning"/>
                                        <input type="file" id="uploadInput" name="thumbnail" onChange={handleChange} />
                                    </div>
                                    <div class="info_text">
                                        <p>
                                            <label htmlFor="">참가 인원 : </label>
                                            <input type="number" min="1" value={challenge.c_numberofparticipants} name="c_numberofparticipants" onChange={handleChange} />
                                        </p>
                                        <p>
                                            <label htmlFor="">시작일 :</label>
                                            <input type="date" name="c_startdate" value={challenge.c_startdate} onChange={handleChange} />
                                        </p>
                                        <p>
                                            <label htmlFor="">종료일 :</label>
                                            <input type="date" name="c_enddate" value={challenge.c_enddate} onChange={handleChange} />
                                        </p>
                                        <p>
                                            <label for="">카테고리 :</label>
                                            <select name="c_category" value={challenge.c_category} onChange={handleChange}>
                                                <option value="1">일상</option>
                                                <option value="2">운동</option>
                                                <option value="3">공부</option>
                                                <option value="4">취미</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="">참가금 :</label>
                                            <input type="number" name="c_fee" value={challenge.c_fee} onChange={handleChange} />
                                        </p>
                                        <p>
                                            <label for="">필수 등록 사진 개수 :</label>
                                            <input type="number" name="c_numberofphoto" value={challenge.c_numberofphoto} onChange={handleChange}/>
                                        </p>
                                        <p>
                                            인증 타입(사진 or 챌린지) :
                                            <input type="radio" id="c_typeofverify_1" name="c_typeofverify" value="1" checked={challenge.c_typeofverify === 1} onChange={handleChange}/><label for="c_typeofverify_1">사진</label>
                                            <input type="radio" id="c_typeofverify_2" name="c_typeofverify" value="2" checked={challenge.c_typeofverify === 2} onChange={handleChange}/><label for="c_typeofverify_2">메타버스</label>
                                        </p>
                                        <p>
                                            <label for="">빈도 타입 :</label>
                                            <input type="radio" id="c_typeoffrequency_1" name="c_typeoffrequency" value="1" checked={challenge.c_typeoffrequency === 1} onChange={handleChange} /><label for="c_typeoffrequency_1">하루에 N번</label>
                                            <input type="radio" id="c_typeoffrequency_2" name="c_typeoffrequency" value="2" checked={challenge.c_typeoffrequency === 2} onChange={handleChange} /><label for="c_typeoffrequency_2">N일에 한번</label>
                                        </p>
                                        <p>
                                            <label htmlFor="">빈도</label>
                                            <input type="number" name="c_frequency" value={challenge.c_frequency} onChange={handleChange}/>
                                        </p>
                                        <p>
                                            <label htmlFor="">성공점수</label>
                                            <input type="number" name="c_score" value={challenge.c_score} onChange={handleChange}/>
                                        </p>
                                    </div>
                                </div>
                                <div class="read_content">
                                    <textarea name="c_content" id="" cols="30" rows="10" placeholder="내용을 작성하세요..." value={challenge.c_content} onChange={handleChange}/>
                                </div>
                                <div class="read_btn">
                                    <button onClick={()=>addChallenge(challenge)}>챌린지등록</button>
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

export default ChallengeWrite;