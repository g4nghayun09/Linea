// import React from "react";
import './main_page.css';
import Header from './header.jsx';
import ImageSlider from './ImageSlider.jsx';
import pic1 from './assets/SliderPic1.svg';
import pic2 from './assets/SliderPic2.svg';
import pic3 from './assets/SliderPic3.svg';

const travelSlides = [
    { image: pic1, title: '강릉 경포해변', content: '여름 바다 보러 떠나기 좋은 날' },
    { image: pic2, title: '부산 해운대',   content: '야경과 함께 즐기는 여름밤' },
    { image: pic3, title: '제주 협재해변', content: '에메랄드빛 바다를 만나는 곳' },
];

function Main_page() {
    return (
        <div>
            <Header></Header>

            <div className='d'>
                <ImageSlider
                    label="요즘 뜨는 여름 여행지"
                    slides={travelSlides}
                    autoPlay={true}
                    interval={4000}
                />
            </div>

        </div>
    );
}
export default Main_page;