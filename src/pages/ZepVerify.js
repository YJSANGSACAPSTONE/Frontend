import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
import Axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

function ZepVerify(props){

    let userInfo;

    const [zep, setZep] = useState("");
    const [uverifiedornot, setUverifiedornot] = useState(0);
    try {
        userInfo = JSON.parse(Cookies.get('userInfo'));
    } catch (e) {
        console.error('Error parsing userInfo cookie:', e);
    }

    useEffect(()=> {
        const jwtToken = Cookies.get("accessTokenCookie");
		const decodedAccToken = jwt_decode(jwtToken);

        Axios.get(`/api/user/zepidverify`,{
            headers : {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
			.then((res) => {
                setUverifiedornot(res.data.uverifiedornot)
				setZep(res.data.uzepid);
			})
			.catch(error => console.log(error));
    }, []);

    function copyCode() {
        var codeInput = document.getElementById("codeInput");
        codeInput.select();
        codeInput.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("코드가 복사되었습니다!");
    }
    return(
        <>
            {props.header}
            <div id="zep" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="zep_verify">

                                {uverifiedornot == 0 ? (
                                    <div class="step-container active copy-button">
                                        <h2 class="step-title">고유 코드 발급</h2>
                                        <div class="form-container ">
                                            <p>
                                                발급된 10자리 코드를 출력하거나 적어두시기 바랍니다.
                                                <br/>
                                                본 코드는 갓생플래너 사이트에서 zep id 인증을 위해서 사용됩니다.
                                            </p>
                                            <div class="code-container">
                                                <input type="text" value={zep} id="codeInput" readonly /><button onClick={copyCode}>복사</button>
                                                
                                            </div>
                                        </div>
                                        <button class="verifySuccess" onclick="nextStep()">인증 완료</button>
                                    </div>
                                ) : (
                                    <div class="step-container active">
                                        <h2 class="step-title">인증 완료</h2>
                                        <div class="form-container">
                                        <p>인증이 완료되었습니다.</p>
                                        <div class="success-message">인증이 성공적으로 완료되었습니다!</div>
                                        </div>
                                        {/* <button onclick="prevStep()">이전 단계</button> */}
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default ZepVerify;