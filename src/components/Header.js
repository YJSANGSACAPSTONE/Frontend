import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Header(){
    const userInfo = JSON.parse(Cookies.get('userInfo'));

    return (
        <div id="subHeader" class="container">
            <div class="container_inner">
                <div>
                    <ul>
                        <Link to="/planner">
                        <li class="sub_logo">
                            <p>갓생플래너</p>
                            <img src="/img/logo.png" alt="logo" />
                        </li>
                        </Link>
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