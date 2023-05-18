import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import Axios from 'axios';
import $ from 'jquery';
import Cookies from 'js-cookie';

function PointPayList(props){
    const [paylist, setPaylist] = useState([]);
    const u_id = JSON.parse(Cookies.get('userInfo')).u_id;
    console.log(u_id);
    useEffect(()=>{        

        Axios.get(`http://localhost:8070/Usage/search?uid=${u_id}`)
        .then((res)=>{
            console.log(res);
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
            <div id="pointPayList" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="payment_list payment-history">
                                <h2>포인트 사용 내역</h2>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>챌린지명</th>
                                        <th>참가비</th>
                                        <th>사용일자</th>
                                        <th>성공여부</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {paylist.length > 0 ? (
                                        paylist.map(paylist => (
                                            <tr key={paylist.uh_id}>
                                                <td>{paylist.uh_challenge}</td>
                                                <td>{paylist.uh_amount}</td>
                                                <td>{paylist.uh_date}</td>
                                                <td><span class="status-paid">성공</span></td>
                                            </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td><span class="status-pending">-</span></td>
                                        </tr>
                                    )}
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

export default PointPayList;