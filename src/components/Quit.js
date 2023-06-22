import React,{useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../css/NotFound.css";
import Axios from "axios";
import Cookies from 'js-cookie';

function Quit(props){
    const userInfo = Cookies.get('userInfo');
    const history = useNavigate();


    const [u_info, setU_info] = useState(JSON.parse(userInfo));

    const {u_id, u_nickname, u_zepid, u_content, userImg, u_level, u_grade, u_img, u_successedchallenge,u_deposit} = u_info;
    useEffect(()=>{
        if(window.confirm('정말 삭제하시겠습니까?')){
            Axios.get(`/api/user/deleteuser?uid=${u_id}`)
            .then((res) => {
            Cookies.remove('userInfo');
            console.log(res.data); // 처리 결과 출력
            history('/');
            })
            .catch((error) => {
                console.log(error); // 오류 발생 시 출력
            });
        }else{
            history('/');
        }
    },[])
    
    return(
        <div>
            탈퇴중...
        </div>
        // <div class="not_container">
        //     <div class="logo">
        //         <img src="/img/logo.png" alt="로고" />
        //     </div>
        //     <h1>준비중인 페이지입니다</h1>
        //     <p>죄송합니다. 현재 준비중인 페이지입니다.</p>
        // </div>
    )
}

export default Quit;
