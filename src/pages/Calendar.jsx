import { useEffect } from 'react';
import { useState } from 'react';

const Calendar = () => {
    const weekly = ['월', '화', '수', '목', '금', '토', '일'];

    const today = new Date();
    const nowYear = today.getFullYear();
    const nowMonth = today.getMonth();

    const [dateArr, setDateArr] = useState([[]]);
    const [year, setYear] = useState(nowYear);
    const [month, setMonth] = useState(nowMonth + 1);

    const getStartAndLastDay = (year, month) => {
        const monthIdx = month - 1;
        const thisMonthStart = new Date(year, monthIdx, 1);
        const thisMonthLast = new Date(year, monthIdx + 1, 0);
        return {
            start: (thisMonthStart.getDay() + 6) % 7,
            last: (thisMonthLast.getDay() + 6) % 7,
        };
    };

    // storage에 값이 없을 때 실행
    const makeCalendar = (year, month) => {
        const monthIdx = month - 1;
        const thisMonthLast = new Date(year, monthIdx + 1, 0);

        const thisLastDate = thisMonthLast.getDate();

        const thisMonthObj = {};

        for (let day = 1; day <= thisLastDate; day++) {
            thisMonthObj[day] = {
                rate: null,
                todo: [],
            };
        }

        localStorage.setItem(`${year}-${month}`, JSON.stringify(thisMonthObj));
    };

    // 달성률 css
    const makeRateVal = (rate) => {
        const angle = rate * 3.6;
        if (rate) {
            return {
                background: `conic-gradient(#000000 0deg ${angle}deg, #d9d9d9 ${angle}deg 360deg)`,
            };
        } else {
            return {
                background: '#d9d9d9',
            };
        }
    };

    const moveHandler = (type) => {
        if (type === 'prev') {
            if (month === 1) {
                setYear(year - 1);
                setMonth(12);
            } else {
                setMonth(month - 1);
            }
        } else {
            if (month === 12) {
                setYear(year + 1);
                setMonth(1);
            } else {
                setMonth(month + 1);
            }
        }
    };

    useEffect(() => {
        const calendarKey = `${year}-${month}`;
        let thisMonthData = localStorage.getItem(calendarKey);

        if (!thisMonthData) {
            makeCalendar(year, month);
            thisMonthData = localStorage.getItem(calendarKey);
        }

        thisMonthData = JSON.parse(thisMonthData);

        const { start, last } = getStartAndLastDay(year, month);
        const thisMonthDataLength = Object.keys(thisMonthData).length;

        const createEmptyDays = (count) => {
            return Array.from({ length: count }, () => ({
                date: null,
                rate: null,
                todo: null,
            }));
        };

        const days = [
            ...createEmptyDays(start),
            ...Array.from({ length: thisMonthDataLength }, (_, idx) => ({
                date: idx + 1,
                ...thisMonthData[idx + 1],
            })),
            ...createEmptyDays(7 - last),
        ];

        const result = [];
        for (let date = 0; date < days.length; date += 7) {
            result.push(days.slice(date, date + 7));
        }

        setDateArr(result);
    }, [month]);
    return (
        <>
            <div className="calendar-header">
                <button onClick={() => moveHandler('prev')}>&lt;</button>
                <span>{`${year}년 ${month}월`}</span>
                <button onClick={() => moveHandler('next')}>&gt;</button>
            </div>
            <section className="calendar-body">
                <ul className="weekly">
                    {weekly.map((w) => (
                        <li key={w} className={w === '일' ? 'red' : ''}>
                            {w}
                        </li>
                    ))}
                </ul>
                {dateArr.map((weeks, weeksIdx) => (
                    <ul key={weeksIdx} className="date-list">
                        {weeks.map((week, weekIdx) => (
                            <li
                                key={weekIdx}
                                className={`${
                                    week.date ? 'day' : 'empty'
                                } date`}
                            >
                                {week.date && (
                                    <button>
                                        <span
                                            className={
                                                weekIdx === 6 ? 'red' : ''
                                            }
                                        >
                                            {week.date}
                                        </span>
                                        <div
                                            className="rate"
                                            style={makeRateVal(week.rate)}
                                        >
                                            <div className="rate-inner">
                                                {week.rate ? week.rate : ''}
                                            </div>
                                        </div>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ))}
            </section>
            <section className="calendar-list">
                <div className="header">
                    <span>11월 1일</span>
                    <button>+</button>
                </div>
                <ul>
                    <li>
                        <input type="checkbox" />
                        <span>첫번째</span>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default Calendar;
