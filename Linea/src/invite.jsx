import "./invite.css";
import { FaUserCircle } from "react-icons/fa";

function Invite() {
    return (
        <div className="container">

            <div className="header">
                <div className="title">
                    <button id="back">&larr;</button>
                    <span>친구 초대</span>
                </div>
            </div>

            <div className="friend-list">
                <div className="friend-card">
                    <div className="friend-info">
                        <div className="profile">
                            <FaUserCircle />
                        </div>
                        <div>
                            <p className="name">홍길동</p>
                            <p className="id">@hongkilldong</p>
                        </div>
                    </div>

                    <button className="remove">−</button>
                </div>

                <div className="friend-card">
                    <div className="friend-info">
                        <div className="profile">
                            <FaUserCircle />
                        </div>

                        <div>
                            <p className="name">박건우</p>
                            <p className="id">@park</p>
                        </div>
                    </div>

                    <button className="remove">−</button>
                </div>

                <hr />

                <div className="friend-card">
                    <div className="friend-info">
                        <div className="profile">
                            <FaUserCircle />
                        </div>

                        <div>
                            <p className="name">김우석</p>
                            <p className="id">@kimkim</p>
                        </div>
                    </div>

                    <button className="add">+</button>
                </div>

            </div>

        </div>
    );
}

export default Invite;