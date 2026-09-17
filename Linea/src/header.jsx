import './header.css';
import house from './assets/HouseDoor.svg';
import promise from './assets/Storage.svg';
import promise_pluse from './assets/PromisePluse.svg';

function Header() {
    return (
        <div className='header'>
            <div className='logo'>Linea</div>

            <div className='navigation_part'>
                <div className='part1'>
                    <a href=""> <img src={house} alt="" className='navigation_house' />홈</a>
                </div>
                <div className='part2'>
                    <a href=""> <img src={promise} alt="" className='navigation_promise' />약속함</a>
                </div>
                <div className='part3'>
                    <a href=""> <img src={promise_pluse} alt="" className='navigation_pluse' />약속 추가</a>
                </div>

            </div>

            <div className='login_part'>
                <a href="" className='login'>로그인</a>
                <a href="" className='signup'>회원가입</a>
            </div>

        </div>
    );
}

export default Header;