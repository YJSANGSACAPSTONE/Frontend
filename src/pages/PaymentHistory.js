import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import Axios from 'axios';
import $ from 'jquery';
import Cookies from 'js-cookie';
function PaymentHistory(props){
    const [paylist, setPaylist] = useState([]);
    const u_id = JSON.parse(Cookies.get('userInfo')).u_id;
    console.log(u_id);
    useEffect(()=>{

        Axios.get(`http://localhost:8070/kakaopay/search?uid=${u_id}`)
        .then((res)=>{
            console.log(res.data);
            setPaylist(res.data);
        })
        .catch(err=>console.log(err));

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
            <div id="payment" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="payment_list payment-history">
                                <h2>충전 내역</h2>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>날짜</th>
                                        <th>결제 수단</th>
                                        <th>가격</th>
                                        <th>성공여부</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {paylist.length > 0 ? (
                                        paylist.map(paylist => (
                                            <tr key={paylist.kp_id}>
                                                <td>{paylist.kp_date}</td>
                                                <td>카카오페이</td>
                                                <td>{paylist.kp_amount}</td>
                                                <td><span class="status-paid">성공</span></td>
                                            </tr>
                                            ))
                                    ) : (
                                        <h3>새로운 일정을 만들어보세요!</h3>
                                    )}
                                    <tr>
                                        <td>2023-05-01</td>
                                        <td>카카오페이</td>
                                        <td>1500</td>
                                        <td><span class="status-paid">성공</span></td>
                                    </tr>
                                    {/* <tr>
                                        <td>2023-04-28</td>
                                        <td>카카오페이</td>
                                        <td>20000</td>
                                        <td><span class="status-paid">성공</span></td>
                                    </tr>
                                    <tr>
                                        <td>2023-04-22</td>
                                        <td>카카오페이</td>
                                        <td>10000</td>
                                        <td><span class="status-paid">성공</span></td>
                                    </tr> */}
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default PaymentHistory;