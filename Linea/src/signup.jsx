import './signup.css'
import { Link } from 'react-router-dom'

function Signup() {
    return (
        <div style={{marginTop: '40px'}}>
            <p style={{color:"black", marginBottom: '30px', fontSize: '32px', fontWeight: 'bold', letterSpacing: '5px'}}>Linea</p>
            <div className="container">
                <label>이름</label>
                <input type="text" placeholder="이름을 입력하세요"  style={{marginBottom: '15px'}} />

                <label>아이디</label>
                <input type="text" placeholder="아이디를 입력하세요" style={{marginBottom: '15px'}} />

                <label>비밀번호</label>
                <input type="password" placeholder="비밀번호를 입력하세요" style={{marginBottom: '20px'}} />

                <button type="submit">회원가입</button>

                <button style={{ backgroundColor: 'white', color: 'black' }}>
                    <Link to="/login" className="a">로그인</Link>
                </button>
            </div>
        </div>
    )
}

export default Signup