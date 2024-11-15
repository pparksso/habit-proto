import { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/main.css';
import './styles/transition.css';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Calendar from './pages/Calendar';
import header from './assets/phone_header.png';

function App() {
    const location = useLocation();
    const prevLocation = useRef(location);

    const getClassNames = () => {
        if (prevLocation.current.pathname === '/loading') return '';
        if (
            prevLocation.current.pathname === '/' &&
            location.pathname === '/calendar'
        )
            return 'page';
        if (
            prevLocation.current.pathname === '/calendar' &&
            location.pathname === '/'
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
                        <Route path="/" element={<Home />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/loading" element={<Loading />} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </main>
    );
}

export default App;
