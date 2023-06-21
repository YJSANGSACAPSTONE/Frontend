import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
import Axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

function Point(props){

    const userInfo = JSON.parse(Cookies.get('userInfo'));
    const [pay, setPay] = useState(0);
    const jwtToken = Cookies.get("accessTokenCookie");
    const pointpay = () => {
        const u_id = userInfo.u_id;
        Cookies.set('payMoney', pay);
        Axios.get(`http://localhost:8070/kakaopay/ready?kpamount=${pay}`,{
            headers : {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        .then((res)=>{
            const win = window.open(res.data.nextRedirectPcUrl, '_blank');
            win.focus();
            const a = document.createElement('a');
            a.href = res.data.nextRedirectPcUrl;
            a.target = '_blank';
            // window.open('/JobComplete', '_blank')
            // a.click();
        })
        .catch((err)=>{
             console.log(err);
        })
    }

    window.addEventListener('message', (event)=>{
        if(event.origin !== window.location.origin){
            console.log("확인되지 않은 origin으로부터의 메세지는 무시합니다.");
            return;
        }

        if(event.data == '작업 완료'){
            // 작업이 완료되면 이동할 경로를 설정합니다.
            window.location.href='/planner';
        }
    })
    return(
        <>
            {props.header}
            <div id="point" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li className="point_area">
                                <div class="charge-point-container">
                                    <h2 class="charge-point-title">포인트 충전</h2>
                                    <p class="user-id">사용자 아이디: <span class="user-id-value">{userInfo.u_id}</span></p>
                                    <form class="charge-point-form">
                                        <label for="charge-amount">충전 금액:</label>
                                        <input type="number" id="charge-amount" name="pay" value={pay} onChange={(e)=>setPay(e.target.value)} />
                                        <button type="button" onClick={pointpay} class="charge-button">충전하기</button>
                                    </form>
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

export default Point;