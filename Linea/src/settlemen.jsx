import { useState } from 'react';
import { Link } from 'react-router-dom';
import './settlemen.css';

function Settlement() {

    const names = ["강하윤", "이여설", "이태율", "홍길동"];

const [money, setMoney] = useState(0);
const [people, setPeople] = useState(0);

const Nmoney = people > 0 ? Math.round(money / people) : 0;

function pay(event) {
    if (event.target.checked) {
        setPeople(prev => prev + 1);
    } else {
        setPeople(prev => prev - 1);
    }
}

    return (

        
        <div>
            <Link to="/promiseMain" className="a" style={{
                        color: 'black',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'start',
                    fontSize: '23px'
                    }}> ← 뒤로가기</Link>
            <div className="container" >
                    <div style={{marginBottom: '50px'}}></div>
                <label>지출내용</label>
                <input
                    type="text"
                    placeholder="지출내용을 입력하세요"
                    style={{ marginBottom: '30px' }}
                />

                <label>총 금액</label>
                <input
                    type="text"
                    value={money}
                    onChange={(event) => {
                        setMoney(event.target.value);
                    }}
                    placeholder="총 금액을 입력하세요"
                    style={{ marginBottom: '20px' }}
                />

                <label>결제자</label>
                <input
                    type="text"
                    placeholder="결제자를 입력하세요"
                    style={{ marginBottom: '20px' }}
                />
                <label style={{marginBottom : '5px'}}>참여자</label>

                <div style={{ display: 'flex', gap: '20px',  marginLeft: '55px' }}>
    {names.map((name, index) => (
        <div key={index}>
            <input
                type="checkbox"
                onClick = {pay}
                style={{ width: 15, height: 15 }}
            />
            <span style={{ color: 'black' }}>{name}</span>
        </div>
    ))}
</div>
            <h3 style={{ color : '#5B8DEF'}}>1인당 금액 {Nmoney}원</h3>
            </div>
            <button style={{width : 230, height : 45, background : '#F3F3F3', color : 'black',borderRadius: '10px',boxShadow: 'none'}}>
                취소
            </button>
            <button style={{width : 230, height : 45, background : '#5B8DEF',borderRadius: '10px', marginLeft : '10px',boxShadow: 'none'}}>
                추가
            </button>
        </div>
    );
}

export default Settlement; 