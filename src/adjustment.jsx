import "./adjustment.css";

function Adjustment() {
    return (
        <div className="container">
            <div className="header">
                <div className="title">
                    <button type="button" id="back">
                        &larr;
                    </button>
                    <span> 약속</span>
                </div>

                <h3>약속 제목</h3>

                <div className="header-btn">
                    <button id="edit">수정</button>
                    <button id="delete">삭제</button>
                </div>
            </div>

            <div className="button-group">
                <button>정보</button>
                <button id="settlement">정산</button>
                <button>채팅</button>
            </div>

            <div className="adjustments">
                <div className="adjustment-header">
                    <span className="adjustment-title">정산</span>
                    <button id="add">정산 추가</button>
                </div>

                <ul>
                    <li>
                        <span className="expense">지출 내용</span>

                        <span className="receiver" id="givePay">
                            user이름에게 내야하는 금액
                        </span>
                        <div className="right">
                            <span>10,000</span>
                            <input type="checkbox" />
                        </div>

                    </li>

                    <li>
                        <span className="expense">지출 내용</span>

                        <span className="receiver" id="givePay">
                            user이름에게 내야하는 금액
                        </span>

                        <div className="right">
                            <span>1,000</span>
                            <input type="checkbox" />
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default Adjustment;