import { createContext, useState } from 'react';

const DateContext = createContext();

// eslint-disable-next-line react/prop-types
export const DateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};

export default DateContext;
