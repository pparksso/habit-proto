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

    useEffect(() => {
        const calendarKey = `${year}-${month}`;
        let thisMonthData = localStorage.getItem(calendarKey);

        if (!thisMonthData) {
            makeCalendar();
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
            ...createEmptyDays(last),
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
                <button>&lt;</button>
                <span>2024년 11월</span>
                <button>&gt;</button>
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
                                <span className={weekIdx === 6 ? 'red' : ''}>
                                    {week.date}
                                </span>
                                <div className="rate">
                                    <div className="rate-inner"></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ))}
            </section>
        </>
    );
};

export default Calendar;
