import { useContext, useState } from 'react';
import DateContext from '../contexts/DateContext';
import { formatDate } from '../utils/date';
import { Link } from 'react-router-dom';

const Home = () => {
    const { selectedDate } = useContext(DateContext);
    const [clicked, setClicked] = useState(null);

    const sampleItems = Array.from({ length: 50 }, (_, idx) => ({
        id: idx + 1,
        text: `${idx + 1}번째`,
    }));

    const textClickHandler = () => {};

    return (
        <>
            <div className="home-top">
                <span>{formatDate(selectedDate)}</span>
                <button>+</button>
            </div>
            <div className="list">
                <ul>
                    {sampleItems.map((item) => (
                        <li key={item.id}>
                            <input type="checkbox" />
                            <span onClick={textClickHandler}>{item.text}</span>
                        </li>
                    ))}
                    {/* span을 클릭 시 인풋으로 변경되며, 오른쪽 끝에 아이콘 출력(수정페이지로 이동) */}
                    {/* <li>
                        <input type="checkbox" />
                        <span>첫번째</span>
                    </li> */}
                </ul>
            </div>
            <Link className="home-link" to="/calendar">
                캘린더
            </Link>
        </>
    );
};

export default Home;
