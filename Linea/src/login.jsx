import './login.css';
import { Link } from 'react-router-dom';

function Login(){
    return(
        <div style={{marginTop: '40px'}}>
            <p style={{color:"black", marginBottom: '30px', fontSize: '32px', fontWeight: 'bold', letterSpacing: '5px'}}>Linea</p>
            <div className="container"> 
                <label>아이디</label>
                <input type="text" placeholder="아이디를 입력하세요" style={{ marginBottom: '15px' }} />
                <label>비밀번호</label>
                <input type="password" placeholder="비밀번호를 입력하세요" style={{ marginBottom: '15px' }} />
                <button type="submit">로그인</button>
                <Link to="/signup">
                    <button style={{ backgroundColor: 'white', color: '#5B8DEF' }}>회원가입</button>
                </Link>
            </div>
        </div>
        
    );
}

export default Login;