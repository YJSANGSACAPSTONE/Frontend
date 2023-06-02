import React, {useState, useEffect} from 'react';
import { Link, useLocation, useParams,useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import Axios from 'axios';
function BoardEdit(props){

    const { id } = useParams();
    const navigate = useNavigate();
    const [read, setRead] = useState({
        b_id:"",
        commentCnt:"",
        imageDTOList:[],
        likeCnt:"",
        po_content:"",
        po_hitcount:"",
        po_id:"",
        po_modDate:"",
        po_regDate:"",
        po_secret:"",
        po_title:"",
        u_id:""
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        if(name === "po_secret" ){
            setRead(prevState => ({...prevState, [name] : parseInt(value)}))
        }else if(name === "uploadFiles"){
            setRead(prevState => ({ ...prevState, [name]: e.target.files[0] }));
        }else{
            setRead(prevState => ({...prevState, [name] : value}))
        }
    }

    const boardEdit = () => {

    }

    useEffect(()=>{
        Axios.get(`http://localhost:8070/post/read?poid=${id}`)
        .then((res)=>{
            setRead(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);
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
                                    <button class="toListBtn" onClick={() => navigate(`/board/${read.po_id}`, { state: { board:read } })}>이전</button>
                                    <ul>
                                        <li>
                                            <div class="write_cate">
                                                <select name="b_id" id="" value={read.b_id} onChange={handleChange}>
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
                                                <input type="text" name="po_title" value={read.po_title} onChange={handleChange} placeHolder="제목" />
                                            </div>
                                            <textarea name="po_content" id="po_content" cols="30" rows="10" value={read.po_content} onChange={handleChange} placeHolder="내용" />
                                            <div>
                                                <label for="open">공개</label><input type="radio" id="open" name="po_secret" value="1" checked={read.po_secret === true} onChange={handleChange} />
                                                <label for="close">비공개</label><input type="radio" id="close" name="po_secret" value="0" checked={read.po_secret === false} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <input type="file" name="uploadFiles" onChange={handleChange} />
                                            </div>
                                            <div>
                                                <button class="toListBtn" onClick={()=>boardEdit()}>등록</button>
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

export default BoardEdit;