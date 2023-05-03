import React from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
function ChallengeWrite(props){
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
                                    <p>챌린지명 : <input type="text"/></p>
                                </div>
                                <div class="read_info">
                                    <div class="info_img">
                                        <img id="thumbnail" src="./img/upload.png" alt="morning"/>
                                        <input type="file" id="uploadInput"/>
                                    </div>
                                    <div class="info_text">
                                        <p>
                                            <label for="">참가 인원 : </label>
                                            <input type="number" min="1" value="1"/>
                                        </p>
                                        <p>
                                            <label for="">시작일 :</label>
                                            <input type="date"/>
                                        </p>
                                        <p>
                                            <label for="">종료일 :</label>
                                            <input type="date"/>
                                        </p>
                                        <p>
                                            <label for="">카테고리 :</label>
                                            <select name="" id="">
                                                <option value="일상">일상</option>
                                                <option value="취미">취미</option>
                                                <option value="운동">운동</option>
                                                <option value="자기계발">자기계발</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="">참가금 :</label>
                                            <input type="number"/>
                                        </p>
                                        <p>
                                            <label for="">필수 등록 사진 개수 :</label>
                                            <input type="number"/>
                                        </p>
                                        <p>
                                            인증 타입(사진 or 챌린지) :
                                            <input type="radio"/><label for="">사진</label>
                                            <input type="radio"/><label for="">메타버스</label>
                                        </p>
                                        <p>
                                            <label for="">빈도 타입 :</label>
                                            <input type="radio"/><label for="">하루에 N번</label>
                                            <input type="radio"/><label for="">N일에 한번</label>
                                        </p>
                                    </div>
                                </div>
                                <div class="read_content">
                                    <textarea name="" id="" cols="30" rows="10" placeholder="내용을 작성하세요..."></textarea>
                                </div>
                                <div class="read_btn">
                                    <button>챌린지등록</button>
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