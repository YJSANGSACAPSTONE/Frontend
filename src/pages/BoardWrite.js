import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import Cookies from 'js-cookie';
import Axios from 'axios';

function BoardWrite(props){
    const userInfo = JSON.parse(Cookies.get('userInfo'));
    const [board,setBoard] = useState({
        // 입력받을 데이터
        b_id : 1,
        u_id : userInfo.u_id,
        po_title : "",
        po_content : "",
        po_secret : true,
        imageDTOList : []
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(name === "po_secret" ){
            setBoard(prevState => ({...prevState, [name] : parseInt(value)}))
        }else{
            setBoard(prevState => ({...prevState, [name] : value}))
        }
    }

    const navigate = useNavigate();
    function toBoard(e){
        navigate('/board');
    }
    

    const boardSubmit = () =>{
        Axios.post('http://localhost:8070/post/register',board)
        .then((res)=>{
            console.log(res);
            // history('/board');
        })
        .catch((error)=>{
            console.log(error)
        });
    }
    
    return(
        <>
            {props.header}
            <div id="board" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="boardlist_area">
                                <div class="board_list">
                                <button class="toListBtn" onClick={toBoard}>목록</button>
                                    <ul>
                                        <li>
                                            <div class="write_cate">
                                                <select name="b_id" id="" value={board.b_id} onChange={handleChange}>
                                                    <option value="1">자유게시판</option>
                                                    <option value="2">익명게시판</option>
                                                    <option value="3">공지사항</option>
                                                    <option value="4">미라클모닝</option>
                                                    <option value="5">1일 20계단</option>
                                                    <option value="6">산책위드망고</option>
                                                </select>
                                            </div>
                                            <div class="list_title">
                                                <div class="title_pro">
                                                    <img src="/img/profile.png" alt="profile"/>
                                                    <h3>@youngjin</h3>
                                                </div>
                                                <input type="text" name="po_title" value={board.po_title} onChange={handleChange} />
                                            </div>
                                            <textarea name="po_content" id="po_content" cols="30" rows="10" value={board.po_content} onChange={handleChange} />
                                            <div>
                                                <label for="open">공개</label><input type="radio" id="open" name="po_secret" value="1" checked={board.po_secret === 1} onChange={handleChange} />
                                                <label for="close">비공개</label><input type="radio" id="close" name="po_secret" value="0" checked={board.po_secret === 0} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <button class="toListBtn" onClick={()=>boardSubmit()}>등록</button>
                                            </div>
                                        </li>
                                    
                                    </ul>
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

export default BoardWrite;