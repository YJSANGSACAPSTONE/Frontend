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
        imageDTOList : [],
        uploadFiles: null
    });
    

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        if(name === "po_secret" ){
            setBoard(prevState => ({...prevState, [name] : parseInt(value)}))
        }else if(name === "uploadFiles"){
            const fileList = Array.from(files); // 파일 배열로 변환
            setBoard((prevState) => ({ ...prevState, [name]: fileList }));
        }else{
            setBoard(prevState => ({...prevState, [name] : value}))
        }
    }

    const navigate = useNavigate();
    function toBoard(e){
        navigate('/board');
    }
    
    const boardSubmit = () => {
        console.log("boardSubmit 함수 실행됨");
        const formData = new FormData();
      
        if (board.uploadFiles != null) {
          for (let i = 0; i < board.uploadFiles.length; i++) {
            formData.append("uploadFiles", board.uploadFiles[i]);
          }
      
          Axios.post('/api/uploadAjax', formData)
            .then((res) => {
              console.log(res);
              const path = "/img/boardimgtemp/" + res.data[0].folderPath;
              const unifiedPath = path.replace(/\\/g, "/");
              const uuid = res.data[0].uuid;
              const fileName = uuid + "_" + res.data[0].fileName;
      
              setBoard(prevState => {
                const updatedImageDTOList = [...prevState.imageDTOList, { path: unifiedPath, imgName: fileName, uuid: uuid }];
                
                // 사진 업로드가 완료된 후에 아래 코드 실행
                performAdditionalActions(updatedImageDTOList);
      
                return {
                  ...prevState,
                  imageDTOList: updatedImageDTOList
                };
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // 사진이 없는 경우 바로 아래 코드 실행
          performAdditionalActions([]);
        }
      };

    // 사진 업로드 이후에 실행할 추가 작업을 수행하는 함수
const performAdditionalActions = (updatedImageDTOList) => {
    console.log("performAdditionalActions 함수 실행됨");
    const postData = {
      ...board,
      imageDTOList: updatedImageDTOList.length > 0 ? updatedImageDTOList : null
    };
  
    Axios.post("/api/post/register", postData)
      .then((res) => {
        navigate("/board");
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const handleRemoveFile = (index) => {
        setBoard((prevState) => {
            const updatedFiles = [...prevState.uploadFiles];
            updatedFiles.splice(index, 1);
            return { ...prevState, uploadFiles: updatedFiles };
        });
    };
    
    useEffect(()=>{
        // console.log(board); // 업데이트된 상태 출력

        // if (board.imageDTOList.length > 0) {
          
        // }
    },[board])

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
                                                <input type="text" name="po_title" value={board.po_title} onChange={handleChange} placeHolder="제목" />
                                            </div>
                                            <textarea name="po_content" id="po_content" cols="30" rows="10" value={board.po_content} onChange={handleChange} placeHolder="내용" />
                                            <div>
                                                <label for="open">공개</label><input type="radio" id="open" name="po_secret" value="1" checked={board.po_secret === true} onChange={handleChange} />
                                                <label for="close">비공개</label><input type="radio" id="close" name="po_secret" value="0" checked={board.po_secret === false} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <input type="file" name="uploadFiles" onChange={handleChange} multiple  />
                                            </div>
                                            <div>
                                                <button class="toListBtn" onClick={()=>boardSubmit()}>등록</button>
                                            </div>
                                            <div className="thumb">
                                                {board.uploadFiles && Array.from(board.uploadFiles).map((file, index) => (
                                                    <div className="thumb_area" key={index}>
                                                        <img className="thumbnail" src={URL.createObjectURL(file)} alt="" />
                                                        <button onClick={() => handleRemoveFile(index)}>X</button>
                                                    </div>
                                                ))}
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