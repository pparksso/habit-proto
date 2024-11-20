import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import DateContext from '../contexts/DateContext';
import { formatDate } from '../utils/date';
import Calendar from '../assets/calendar.png';

const Home = () => {
    const { selectedDate } = useContext(DateContext);
    const [clicked, setClicked] = useState(null);

    const sampleItems = Array.from({ length: 50 }, (_, idx) => ({
        id: idx + 1,
        text: `${idx + 1}번째`,
    }));

    const textClickHandler = (num) => {
        setClicked(num);
        // 클릭한 칸(idx?)만 인풋으로 변경 및, icon 출력
    };

    return (
        <>
            <div className="home-top">
                <span>{formatDate(selectedDate)}</span>
                <Link to="/add">+</Link>
            </div>
            <div className="list">
                <ul>
                    {sampleItems.map((item, idx) => (
                        <li key={item.id}>
                            <input type="checkbox" />
                            {clicked !== idx ? (
                                <span onClick={() => textClickHandler(idx)}>
                                    {item.text}
                                </span>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        autoFocus
                                        value={item.text}
                                    />
                                    <Link>i</Link>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <Link className="home-link" to="/calendar">
                <img src={Calendar} />
            </Link>
        </>
    );
};

export default Home;
