import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
function AdminPage(props){
    
    useEffect(()=>{

    }, []);
    return(
        <>
            {props.header}
            <div id="adminPage" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default AdminPage;