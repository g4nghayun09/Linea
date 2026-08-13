import './signup.css';

function Signup(){
    return(
        <div>
            <h1 style={{color:"black", marginBottom: '120px'}}>fromis_A</h1>
            <div className="container"> 
                <label>아이디</label>
                <input type="text" placeholder="아이디를 입력하세요" style={{ marginBottom: '30px' }} />
                <label>비밀번호</label>
                <input type="password" placeholder="비밀번호를 입력하세요" style={{ marginBottom: '20px' }} />
                <button>로그인</button>
                <button style={{ backgroundColor: 'white', color: 'black' }}>회원가입</button>
            </div>
        </div>
        
    );
}

export default Signup;