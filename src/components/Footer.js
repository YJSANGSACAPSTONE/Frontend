import React from 'react';

function Footer(){
    return(
        <div id="subFooter" class="container">
            <div class="container_inner">
                <div>
                    <ul>
                        <li><a href="/planner"><img src="./img/home.png" alt="home"/></a></li>
                        <li><a href="board.html"><img src="./img/list.png" alt="list"/></a></li>
                        <li><a href="/challenge"><img src="./img/flag.png" alt="flag"/></a></li>
                        <li><a href="profile.html"><img src="./img/user.png" alt="user"/></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;