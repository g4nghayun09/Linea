import { useState } from 'react';
import KOREAN_HOLIDAYS from './koreanHolidays';
import './RollingCalendar.css';

// 한 달 단위 캘린더 (일요일부터 시작).
// 1일 앞쪽과 말일 뒤쪽의 빈칸은 연한 '00'으로 채워서 칸 모양을 유지한다.
// 라이브러리 없이 순수 React로 구현.

function startOfMonth(date) {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
}

function formatYMD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

// events 예시 구조: [{ date: '2026-08-19', color: '#B5CDF5', highlight: true }]
function RollingCalendar({ events = [], onSelectDate }) {
    const [month, setMonth] = useState(() => startOfMonth(new Date()));
    const [selected, setSelected] = useState(null);

    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const leading = month.getDay(); // 1일이 무슨 요일인지 (0 = 일요일)
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const trailing = (7 - ((leading + daysInMonth) % 7)) % 7;

    // null = 빈칸
    const cells = [
        ...Array(leading).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, monthIndex, i + 1)),
        ...Array(trailing).fill(null),
    ];

    const eventMap = {};
    events.forEach((e) => {
        if (!eventMap[e.date]) eventMap[e.date] = [];
        eventMap[e.date].push(e);
    });

    function shift(months) {
        setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + months, 1));
    }

    const todayStr = formatYMD(new Date());

    return (
        <div className="rc-card">
            <div className="rc-header">
                <button type="button" className="rc-nav" onClick={() => shift(-1)} aria-label="이전 달">&lt;</button>
                <span className="rc-label">{year}년 {monthIndex + 1}월</span>
                <button type="button" className="rc-nav" onClick={() => shift(1)} aria-label="다음 달">&gt;</button>
            </div>

            <div className="rc-grid">
                {cells.map((d, i) => {
                    if (!d) {
                        return (
                            <div key={`empty-${i}`} className="rc-cell rc-cell--empty">
                                <span className="rc-date">00</span>
                            </div>
                        );
                    }

                    const key = formatYMD(d);
                    const dayEvents = eventMap[key] || [];
                    const isHighlight = dayEvents.some((e) => e.highlight);
                    const isToday = key === todayStr;
                    const isSelected = key === selected;
                    const holidayName = KOREAN_HOLIDAYS[key];
                    const isRedDay = d.getDay() === 0 || !!holidayName; // 일요일 또는 공휴일

                    return (
                        <button
                            type="button"
                            key={key}
                            title={holidayName}
                            className={
                                'rc-cell' +
                                (isRedDay ? ' rc-cell--red' : '') +
                                (isHighlight ? ' rc-cell--highlight' : '') +
                                (isToday ? ' rc-cell--today' : '') +
                                (isSelected ? ' rc-cell--selected' : '')
                            }
                            onClick={() => {
                                setSelected(key);
                                onSelectDate && onSelectDate(key);
                            }}
                        >
                            <span className="rc-date">{d.getDate()}</span>
                            <span className="rc-dots">
                                {dayEvents.filter((e) => e.color).slice(0, 3).map((e, j) => (
                                    <span key={j} className="rc-dot" style={{ background: e.color }} />
                                ))}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default RollingCalendar;
