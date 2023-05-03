import React from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import $ from 'jquery';
function defaultPage(props){
    useEffect(()=>{
        function updateSubFooterPosition() {
            console.log(123)
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
            <div id="defaultPage" class="container">
                <div class="container_inner">
                    <div>
                        <ul>
                            <Profile/>
                            
                        </ul>
                    </div>
                </div>
            </div>
            {props.footer}
        </>
    )
}

export default defaultPage;