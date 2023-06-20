import React,{ useState, useEffect } from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import Profile from '../components/Profile';
import Cookies from 'js-cookie';
import Axios from 'axios';

function BoardRead(props){
    const location = useLocation();
    const board = location.state.board;
    const userInfo = JSON.parse(Cookies.get('userInfo'));
    

    const [formattedTimeDiff, setFormattedTimeDiff] = useState("");
    const [commentText, setCommentText] = useState("");
    const [liked, setLiked] = useState(false); // 좋아요 상태를 관리하는 변수

    const navigate = useNavigate();
    function toBoard(e){
        navigate('/board');
    }
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


    const readPost = () => {
        Axios.get(`http://localhost:8070/post/read?poid=${board.po_id}`)
        .then((res)=>{
            setRead(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    useEffect(()=>{
        readPost();
        Axios.get(`http://localhost:8070/post/liked/${board.po_id}/${userInfo.u_id}`)
        .then((res)=>{setLiked(res.data)})
        .catch((err)=>{console.log(err)});
    }, []);

    const commentWrite = (postId) => {
        console.log("post ID : " + postId + " comm_text : " + commentText);
        Axios.post(`http://localhost:8070/comments/${postId}`, {
            u_id : userInfo.u_id,
            comm_text : commentText
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const deletePost = (postId) => {
        if(window.confirm("게시글을 삭제하시겠습니까?")){
            Axios.delete(`http://localhost:8070/post/remove/${postId}`)
            .then((res) => {
                console.log(res);
                navigate('/board');
            })
            .catch((err) => {
                console.log(err);
                // 요청이 실패한 경우의 처리
            });
        }  
    };

    const likeBtn = (postId) => {
        console.log("postID : " + postId + " uid : " + userInfo.u_id);
        Axios.post(`http://localhost:8070/post/like/${postId}`, {
            uid : userInfo.u_id
        })
        .then((res)=>{
            setLiked(res.data);
            readPost();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const editPost = (postId) => {
        if(window.confirm("게시글을 수정하시겠습니까?")){
            navigate(`/board/${postId}/edit`);
        }
    }

    useEffect(()=>{
        const getFormattedTimeDiff = (timeDiff) => {
            const minutes = Math.floor(timeDiff / (1000 * 60)); // 분 단위 계산
            const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // 시간 단위 계산
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 일 단위 계산
            
            if (minutes < 60) {
                return `${minutes}분 전`;
            } else if (hours < 24) {
                return `${hours}시간 전`;
            } else {
                return `${days}일 전`;
            }
        };
        
        const currentDateTime = new Date(); // 현재 시간 생성
        const postDateTime = new Date(read.po_regDate); // 서버에서 받아온 게시물 등록 시간
        const timeDiff = currentDateTime - postDateTime; // 현재 시간과 게시물 등록 시간의 차이 (밀리초 단위)
        
        setFormattedTimeDiff(getFormattedTimeDiff(timeDiff)); // 시간 차이를 포맷팅된 문자열로 변환
    },[read]);
    

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
                                    &nbsp;
                                    {board.u_id == userInfo.u_id ? (
                                        <>
                                            <button class="toListBtn" onClick={() => deletePost(read.po_id)}>삭제</button>&nbsp;<button class="toListBtn" onClick={()=> editPost(read.po_id)}>수정</button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <ul>
                                        <li>
                                            <div class="list_title">
                                                <div class="title_pro">
                                                    <img src="/img/profile.png" alt="profile" />
                                                    <h5>{board.u_id}</h5>
                                                    {/* <p>{board.po_regDate}</p> */}
                                                </div>
                                                <h1>
                                                    {board.po_title}
                                                </h1>
                                                <div className="readLike">
                                                    <img
                                                        onClick={() => likeBtn(read.po_id)}
                                                        src={liked ? "/img/like-active.png" : "/img/like.png"}
                                                        alt="like"
                                                    />
                                                </div>
                                            </div>
                                            <p>
                                                {board.po_content}
                                                {read.imageDTOList && read.imageDTOList.length > 0 ? (
                                                <img
                                                    className="boardReadImg"
                                                    src={`http://localhost:8070${read.imageDTOList[0]?.path}/${read.imageDTOList[0]?.imgName}`}
                                                    alt=""
                                                />
                                                ) : null}

                                            </p>
                                            <div>추천 : {read.likeCnt} &nbsp;&nbsp;&nbsp; <img src="/img/message-icon.png" alt="message-icon" /> {read.commentCnt} &nbsp;&nbsp;&nbsp; {formattedTimeDiff} &nbsp;&nbsp;&nbsp; 조회수 : {read.po_hitcount-2}</div>
                                            
                                        </li>
                                        {/* <li class="list_comment">
                                            <img src="/img/profile.png" alt="profile"/>
                                            <div class="comment_content">
                                                <p>@youngjin</p>
                                                <p>간단한 댓글 내용</p>
                                            </div>
                                            <div class="comment_info">
                                                <p><a href="">삭제</a> &nbsp; <a href="">수정</a> </p>
                                                <p>04/12 &nbsp; 16:32</p>
                                            </div>
                                        </li> */}
                                        <li class="comment_write">
                                            <img src="/img/profile.png" alt="profile" />
                                            <div class="comment_content">
                                                <p>{userInfo.u_id} <br/><br/></p>
                                                <textarea name="commentText" id="commentText" value={commentText} onChange={(e)=>setCommentText(e.target.value)} cols="30" rows="10"></textarea>
                                            </div>
                                            <div class="comment_btn">
                                                <button onClick={()=>commentWrite(read.po_id)}>작성</button>
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

export default BoardRead;