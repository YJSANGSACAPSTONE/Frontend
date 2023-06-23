import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Profile from '../components/Profile';
import Axios from 'axios';
import Cookies from 'js-cookie';

function Board(props){

    const [boards, setBoards]=useState([]);
    const navigate = useNavigate();
    const userInfo = JSON.parse(Cookies.get('userInfo'));
    const [selectedCategory, setSelectedCategory] = useState('1');

    const [pageInfo, setPageInfo] = useState({
        totalPage: 1,
        page: 1,
        size: 10,
        start: 1,
        end: 1,
        prev: false,
        next: false,
        pageList: [1],
      });


    const MvRead = (board) => {
        navigate(`/board/${board.po_id}`, { state: { board } });
    }
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handlePageChange = (page) => {
        Axios.get(`/api/post/list/${selectedCategory}?page=${page}`)
        .then((res) => {
            console.log(res);
            setBoards(res.data.dtoList);
            setPageInfo(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
  };

  useEffect(() => {
    Axios.get(`/api/post/list/${selectedCategory}`)
      .then((res) => {
        console.log(res);
        setBoards(res.data.dtoList);
        setPageInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);
    return(
        <>
            {props.header}
            <div id="board" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            <li class="board_area">
                                <div class="search_area">
                                    <form action="">
                                    <select name="" id="" onChange={handleCategoryChange} value={selectedCategory}>
                                        <option value="1">자유게시판</option>
                                        <option value="2">익명게시판</option>
                                        <option value="3">공지사항</option>
                                        <option value="4">미라클모닝</option>
                                        <option value="5">1일 20계단</option>
                                        <option value="6">산책위드망고</option>
                                    </select>
                                        <input type="text" placeholder="게시글 Search . . ." />
                                        
                                        <button type="button" onClick={()=>navigate(`/board/write`)}>
                                            게시글 작성하기 
                                            <img src="./img/edit.png" alt="edit"/>
                                        </button>
                                        
                                    </form>
                                </div>
                                <div class="board_list">
                                    <ul>
                                        {Object.keys(boards).length > 0 ? (
                                            boards.map(boards => (
                                                
                                                <li onClick={() => MvRead(boards)}>
                                                    <p><h3>{boards.po_title}</h3></p>
                                                    {/* <p>{boards.po_content}</p> */}
                                                    <div>1시간 전 &nbsp;&nbsp;&nbsp; 조회수 : {boards.po_hitcount}</div>
                                                    <div>
                                                        <img src="./img/message-icon.png" alt=""/> {boards.commentCnt}
                                                        &nbsp;&nbsp;&nbsp; 
                                                        {boards.u_id}
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <>
                                            <li><div><p>등록된 게시글이 없습니다.</p></div></li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                                <div class="pagination">
                                    {pageInfo.prev && (
                                        <button onClick={() => handlePageChange(pageInfo.page - 1)}>
                                        이전
                                        </button>
                                    )}
                                    {pageInfo.pageList.map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={page === pageInfo.page ? 'active' : ''}
                                    >
                                        {page}
                                    </button>
                                    ))}
                                    {pageInfo.next && (
                                        <button onClick={() => handlePageChange(pageInfo.page + 1)}>
                                        다음
                                        </button>
                                    )}
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

export default Board;