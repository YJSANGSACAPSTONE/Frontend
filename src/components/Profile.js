import { Link, useLocation } from "react-router-dom";

export default function Profile(){
    const location = useLocation();
    const shouldRenderHotChart = location.pathname === "/board";
    return (
        <li className="planner_profile">
            <Link to="/planner">
                <div>
                <div className="pl_pro_img">
                    <img src="/img/profile.png" alt="profile" />
                    <p>@sinsung test</p>
                </div>
                <div className="pl_pro_text">
                    <p>영진상사</p>
                    <p>lv. 10</p>
                </div>
                </div>
            </Link>
            {shouldRenderHotChart && (
                <div class="hot_chart">
                    <h2>Hot 게시물</h2>
                    <ul>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                        <li>
                            <p>간단한 내용</p>
                            <p>04/12 16:32</p>
                        </li>
                    </ul>
                </div>
            )}
        </li>
    )
}