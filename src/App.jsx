import { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/main.css';
import './styles/transition.css';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Calendar from './pages/Calendar';
import Add from './pages/Add';
import header from './assets/phone_header.png';

function App() {
    const location = useLocation();
    const prevLocation = useRef(location);

    const getClassNames = () => {
        if (prevLocation.current.pathname === '/loading') return '';
        if (
            prevLocation.current.pathname === '/calendar' &&
            location.pathname === '/add'
        )
            return 'bottom';
        return '';
    };

    prevLocation.current = location;

    return (
        <main id="card">
            <div className="p-header">
                <img src={header} alt="header" />
            </div>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={500}
                    classNames={getClassNames()}
                >
                    <Routes location={location}>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="/" element={<Calendar />} />
                        <Route path="/loading" element={<Loading />} />
                        <Route path="/add" element={<Add />} />
                        <Route path="/edit/:id" element={<Add />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </main>
    );
}

export default App;
