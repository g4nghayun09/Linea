import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ImageSlider.css";

/**
 * ImageSlider
 * 가운데 카드가 크게 보이고 양옆 카드가 살짝 보이는(peek) 슬라이더.
 *
 * Props
 * ----------------------------------------------------------------
 * label      : string   상단 제목 (예: "요즘 뜨는 여름 여행지")
 * slides     : Array<{
 *                image: string,     // 이미지 URL
 *                title: string,     // 카드 위에 표시될 굵은 제목
 *                content: string,   // 제목 아래 표시될 설명 텍스트
 *              }>
 * autoPlay   : boolean  자동 재생 여부 (기본 true)
 * interval   : number   자동 재생 간격(ms) (기본 4000)
 * ----------------------------------------------------------------
 *
 * 사용 예:
 * <ImageSlider
 *   label="요즘 뜨는 여름 여행지"
 *   slides={[
 *     { image: "/img/gyeongpo.jpg", title: "강릉 경포해변", content: "여름 바다 보러 떠나기 좋은 날" },
 *     { image: "/img/busan.jpg",   title: "부산 해운대",   content: "야경과 함께 즐기는 여름밤" },
 *   ]}
 * />
 */
export default function ImageSlider({
  label,
  slides = [],
  autoPlay = true,
  interval = 4000,
}) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const count = slides.length;

  const goTo = useCallback(
    (index) => {
      if (count === 0) return;
      const next = ((index % count) + count) % count;
      setCurrent(next);
    },
    [count]
  );

  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  // 자동 재생
  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval, count]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    if (!autoPlay || count <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, interval);
  };

  if (count === 0) return null;

  // 가운데 기준 왼쪽/오른쪽 카드 인덱스 (peek 용)
  const prevIndex = (current - 1 + count) % count;
  const nextIndex = (current + 1) % count;

  const getPosition = (index) => {
    if (index === current) return "center";
    if (index === prevIndex) return "prev";
    if (index === nextIndex) return "next";
    return "hidden";
  };

  return (
    <div
      className="img-slider"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {label && <h2 className="img-slider__label">{label}</h2>}

      <div className="img-slider__track">
        {slides.map((slide, index) => {
          const position = getPosition(index);
          if (position === "hidden") return null;

          return (
            <div
              key={index}
              className={`img-slider__card img-slider__card--${position}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              onClick={() => {
                if (position === "prev") goPrev();
                if (position === "next") goNext();
              }}
              role={position !== "center" ? "button" : undefined}
              aria-label={position !== "center" ? `${slide.title} 슬라이드로 이동` : undefined}
            >
              {position === "center" && (
                <div className="img-slider__overlay">
                  <p className="img-slider__title">{slide.title}</p>
                  {slide.content && (
                    <p className="img-slider__content">{slide.content}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {count > 2 && (
          <>
            <button
              type="button"
              className="img-slider__arrow img-slider__arrow--left"
              onClick={goPrev}
              aria-label="이전 슬라이드"
            >
              ‹
            </button>
            <button
              type="button"
              className="img-slider__arrow img-slider__arrow--right"
              onClick={goNext}
              aria-label="다음 슬라이드"
            >
              ›
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="img-slider__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`img-slider__dot ${
                index === current ? "img-slider__dot--active" : ""
              }`}
              onClick={() => goTo(index)}
              aria-label={`${index + 1}번째 슬라이드로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
