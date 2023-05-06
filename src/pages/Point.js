import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
import Axios from "axios";
import Cookies from 'js-cookie';
function Point(props){

    const userInfo = JSON.parse(Cookies.get('userInfo'));
    const [pay, setPay] = useState(0);
    const pointpay = () => {
        const u_id = userInfo.u_id;
        
        Axios.get(`http://localhost:8070/kakaopay/ready?uid=${u_id}&kpamount=${pay}`)
        .then((res)=>{
            const win = window.open(res.data.nextRedirectPcUrl, '_blank');
            win.focus();
            const a = document.createElement('a');
            a.href = res.data.nextRedirectPcUrl;
            a.target = '_blank';
            // a.click();
        })
        .catch((err)=>{
             console.log(err);
        })
    }
    useEffect(()=>{
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
    
        
    }, []);
    return(
        <>
            {props.header}
            <div id="point" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li className="point_area">
                                유저이름 : {userInfo.u_id}
                                <label htmlFor="">충전 금액 : </label>
                                <input type="number" name="pay" value={pay} onChange={(e)=>setPay(e.target.value)} />
                                <button type="button" onClick={pointpay}>충전하기</button>
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