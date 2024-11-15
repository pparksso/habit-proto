export const formatDate = (date) => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const year = date.getFullYear(); // 연도
    const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1 필요)
    const day = date.getDate(); // 일
    const dayOfWeek = daysOfWeek[date.getDay()]; // 요일

    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
};
