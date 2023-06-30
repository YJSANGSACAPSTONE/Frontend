import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
function ServiceIntro(props){
    useEffect(()=>{
        
    }, []);
    return(
        <>
            {props.header}
            <div id="ServiceIntro" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <li className="service_area">
                                <img src="/img/serviceIntro.png" alt="serviceIntro" />
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default ServiceIntro;