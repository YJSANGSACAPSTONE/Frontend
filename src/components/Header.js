import React from 'react'

function Header(){
    return (
        <div id="subHeader" class="container">
            <div class="container_inner">
                <div>
                    <ul>
                        <li class="sub_logo" onclick="location.href='planner.html';">
                            <p>갓생플래너</p>
                            <img src="./img/logo.png" alt="logo" />
                        </li>
                        <li class="sub_burger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;