import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RollingCalendar from './RollingCalendar';

import './promiseMain.css';

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

// 핀 찍을 장소들 (나중에 서버 데이터로 교체)
const places = [
    { id: 1, name: '강남역 고깃집', price: 32000, lat: 37.4979, lng: 127.0276 },
    { id: 2, name: '신논현 파스타', price: 18000, lat: 37.5046, lng: 127.0250 },
    { id: 3, name: '역삼 카페', price: 6500, lat: 37.5006, lng: 127.0364 },
];

// 약속 참여자들 (나중에 서버 데이터로 교체)
const members = [
    { id: 1, name: '강하윤' },
    { id: 2, name: '이여설' },
    { id: 3, name: '이태율' },
    { id: 4, name: '홍길동' },
];
// 약속 제목 (나중에 서버 데이터로 교체)
let fromisname = "제목";

// 캘린더 표시용 일정 (나중에 서버 데이터로 교체)
// highlight: true → 노란 칸, color → 날짜 아래 점
// 예: { date: '2026-10-21', highlight: true, color: '#B5CDF5' }
const calendarEvents = [];

// 카카오맵 SDK를 한 번만 불러오기
function loadKakaoMap() {
    if (window.kakao && window.kakao.maps) {
        return new Promise((resolve) => window.kakao.maps.load(resolve));
    }
    return new Promise((resolve, reject) => {
        if (!KAKAO_APP_KEY) {
            reject(new Error('VITE_KAKAO_MAP_KEY가 없습니다. 프로젝트 루트의 .env를 확인하세요.'));
            return;
        }
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
        script.onload = () => window.kakao.maps.load(resolve);
        script.onerror = () => reject(new Error('카카오맵 SDK 로드 실패: 키 또는 등록된 도메인을 확인하세요.'));
        document.head.appendChild(script);
    });
}

function PromiseMain() {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        loadKakaoMap().then(() => {
            const { kakao } = window;
            const map = new kakao.maps.Map(mapRef.current, {
                center: new kakao.maps.LatLng(places[0].lat, places[0].lng),
                level: 4,
            });
            mapInstance.current = map;

            const bounds = new kakao.maps.LatLngBounds();
            places.forEach((place) => {
                const position = new kakao.maps.LatLng(place.lat, place.lng);
                const marker = new kakao.maps.Marker({ map, position, title: place.name });
                kakao.maps.event.addListener(marker, 'click', () => setSelectedId(place.id));
                bounds.extend(position);
            });
            map.setBounds(bounds);
        }).catch((err) => console.error(err.message));
    }, []);

    const handleSelect = (place) => {
        setSelectedId(place.id);
        const { kakao } = window;
        if (mapInstance.current && kakao) {
            mapInstance.current.panTo(new kakao.maps.LatLng(place.lat, place.lng));
        }
    };

    return (
        <div>
            <div className='top-bar'>
                <Link to="" className='main'>←약속</Link>
                <h2 className='title'>{fromisname}</h2>
            </div>
            {/* 탭 메뉴: to="" 에 각 페이지 경로 연결 */}
            <nav className='tab-menu'>
                <Link to="" className='tab active'>정보</Link>
                <Link to="" className='tab'>정산</Link>
                <Link to="" className='tab'>채팅</Link>
            </nav>
            <div className="map-layout">
                <div ref={mapRef} className="map-container"></div>
                <div className="place-panel">
                    <div className="place-header">
                        <p className="place-title">장소 목록</p>
                        <Link to="" className='place-Add'>장소 추가</Link>
                    </div>
                    <ul className="pin-list">
                        {places.map((place) => (
                            <li
                                key={place.id}
                                className={place.id === selectedId ? 'pin-item selected' : 'pin-item'}
                                onClick={() => handleSelect(place)}
                            >
                                <span className="pin-name">{place.name}</span>
                                <span className="pin-price">{place.price.toLocaleString()}원</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='bottom-layout'>
                <div className='Members'>
                    <p>참가자 {members.length}명</p>
                    <button className='invite'>초대</button>
                    {members.map((member) => (
                        <div key={member.id} className='member-box'>
                            <div className='member-avatar'>{member.name[0]}</div>
                            <span className='member-name'>{member.name}</span>
                        </div>
                    ))}
                </div>
                <div className='Calendar'>
                    <RollingCalendar events={calendarEvents} />
                </div>
            </div>
        </div>
    );
}

export default PromiseMain;
