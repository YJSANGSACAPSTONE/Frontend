import React from 'react';
import { Link } from 'react-router-dom';

function Footer(){
    return(
        <div id="subFooter" class="container">
            <div class="container_inner">
                <div>
                    <ul>
                        <li><Link to="/planner"><img src="/img/home.png" alt="home"/></Link></li>
                        <li><Link to="/board"><img src="/img/list.png" alt="list"/></Link></li>
                        <li><Link to="/challenge"><img src="/img/flag.png" alt="flag"/></Link></li>
                        <li><Link to="/profile"><img src="/img/user.png" alt="user"/></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;