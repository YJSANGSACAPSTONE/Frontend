import React, {useState, useEffect} from 'react';
import { Link, useLocation, useParams,useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import Axios from 'axios';
function BoardEdit(props){

    const { id } = useParams();
    const navigate = useNavigate();
    const [edit, setEdit] = useState();
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
        u_id:"",
        uploadFiles: null
    });
    const [removeFileName, setRemoveFileName] = useState("");
    
    const handleChange = (e) => {
        const {name, value, files} = e.target;

        if(name === "po_secret" ){
            setRead(prevState => ({...prevState, [name] : parseInt(value)}))
        }else if(name === "uploadFiles"){
            const fileList = Array.from(files); // 파일 배열로 변환
            setRead((prevState) => ({ ...prevState, [name]: fileList }));
        }else{
            setRead(prevState => ({...prevState, [name] : value}))
        }
    }

    const handleRemoveFile = (index) => {
        setRead((prevState) => {
            const updatedFiles = [...prevState.uploadFiles];
            updatedFiles.splice(index, 1);
            return { ...prevState, uploadFiles: updatedFiles };
        });
    };

    // 기존 이미지 파일 제거
    const handleRemoveImage = (index, fileName) => {
        setRemoveFileName(fileName);
        console.log(fileName);
        Axios.post('/api/removeFile', {
            fileName : fileName
        })
        .then((res)=>{
            console.log(res);
            
        })
        .catch((err)=>{
            console.log(err);
        })  
        setRead(prevState => {
            const updatedImageDTOList = [...prevState.imageDTOList];
            updatedImageDTOList.splice(index, 1);
            return { ...prevState, imageDTOList: updatedImageDTOList };
        });
    }

    // 수정 업로드 함수
    const boardEdit = () => {
        const formData = new FormData();
        // formData.append('uploadFiles', read.uploadFiles);
        console.log(read.uploadFiles);
        if (read.uploadFiles !== undefined && read.uploadFiles !== null && read.uploadFiles.length > 0) {
            for (let i = 0; i < read.uploadFiles.length; i++) {
              formData.append("uploadFiles", read.uploadFiles[i]);
            }
            Axios.post('/api/uploadAjax',formData)
            .then((res)=>{
                console.log(res);
                const path = "/img/boardimgtemp/" + res.data[0].folderPath;
                const unifiedPath = path.replace(/\\/g, "/");
                const uuid = res.data[0].uuid;
                const fileName = uuid+"_"+res.data[0].fileName;
                

                setRead(prevState => ({
                    ...prevState,
                    imageDTOList: [...prevState.imageDTOList, { path: unifiedPath, imgName: fileName, uuid:uuid }]
                }));
                setEdit(true);

            })
            .catch((err)=>{
                console.log(err);
            });
        }else{
            setEdit(true);
        }
        
        
    }

    useEffect(()=>{
        Axios.get(`/api/post/read?poid=${id}`)
        .then((res)=>{
            setRead(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    useEffect(()=>{
        
        if(edit == true){
            console.log(read);
           
            // 게시물 수정 요청
            Axios.put(`/api/post/modify/${read.po_id}`, read)
            .then((res) => {
                console.log(res.data);
                navigate(`/board/${read.po_id}`, { state: { board: read } });
                // 게시물 수정 완료 후 동작
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
    },[edit])

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
                                                <input type="file" name="uploadFiles" onChange={handleChange} multiple />
                                            </div>
                                            <div>
                                                <button class="toListBtn" onClick={()=>boardEdit()}>등록</button>
                                            </div>
                                            <div className="thumb" style={{ flexDirection: "column-reverse" }}>
                                                {read.uploadFiles && Array.from(read.uploadFiles).map((file, index) => (
                                                    <div className="thumb_area" key={index}>
                                                        <img className="thumbnail" src={URL.createObjectURL(file)} alt="" />
                                                        <button onClick={() => handleRemoveFile(index)}>X</button>
                                                    </div>
                                                ))}
                                                {read.imageDTOList.map((image, index) => (
                                                <div className="thumb_area" key={index}>
                                                    <img className="thumbnail" src={"http://localhost:8070"+image.path+"/"+image.imgName} alt="" />
                                                    <button onClick={() => handleRemoveImage(index, image.imgName)}>X</button>
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

export default BoardEdit;