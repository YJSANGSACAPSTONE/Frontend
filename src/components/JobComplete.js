import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import Cookies from 'js-cookie';

function JobComplete(){
    let payMoney = Cookies.get('payMoney');
    let userInfo = JSON.parse(Cookies.get('userInfo'));
    userInfo.u_deposit = userInfo.u_deposit + payMoney;

    const closeWindow = () => {
        
        window.opener.postMessage('작업 완료', window.location.origin);
        window.close();
    }
    return (
        <div id="header" class="container">
            <div class="container_inner">
                <div>
                    <ul>
                        <li class="header_logo">
                            <img src="./img/logo.png" alt="logo" />
                        </li>
                        <li class="header_title">
                            <p>갓생플래너</p>
                        </li>
                        <li>
                            <button class="signUpBtn" onClick={closeWindow}>결제 완료</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default JobComplete;