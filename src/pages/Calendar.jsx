import { useEffect } from 'react';
import { useState } from 'react';

const Calendar = () => {
    const weekly = ['월', '화', '수', '목', '금', '토', '일'];

    const today = new Date();
    const nowYear = today.getFullYear();
    const nowMonth = today.getMonth();

    const [dateArr, setDateArr] = useState([]);
    const [year, setYear] = useState(nowYear);
    const [month, setMonth] = useState(nowMonth + 1);

    const getStartDay = (year, month) => {
        const monthIdx = month - 1;
        const thisMonthStart = new Date(year, monthIdx, 1);
        return thisMonthStart.getDay();
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

        // 첫 주만 따로 넣고, 그 다음부터 7씩 나누기
        const weeks = [];
        const startDay = getStartDay();
    }, [month]);
    makeCalendar(year, month);
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
                        <li key={w}>{w}</li>
                    ))}
                </ul>
                {/* ul이 5줄 생김
                <li>
                <Link>
                <span>날짜
                </span>
                <div><span></span></div>
                    </Link>
                </li>
                 */}
            </section>
        </>
    );
};

export default Calendar;
