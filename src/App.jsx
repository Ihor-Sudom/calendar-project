import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import './common.scss';

const App = () => {
  const [ weekStartDate, setWeekStartDate ] = useState(new Date());
  const [ statusModalWindow, setStatusModalWindow ] = useState(false);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header 
        weekDates={weekDates}
        nextWeek={() => setWeekStartDate(new Date(weekStartDate.setDate(weekStartDate.getDate() + 7)))} 
        lastWeek={() => setWeekStartDate(new Date(weekStartDate.setDate(weekStartDate.getDate() - 7)))} 
        todayWeek={() => setWeekStartDate(new Date())}
        modalWindow={() => setStatusModalWindow(!statusModalWindow)} 
      />
      <Calendar
        weekDates={weekDates}
        modalWindow={() => setStatusModalWindow(!statusModalWindow)}
        statusModalWindow={statusModalWindow}
      />
    </>
  );
};

export default App;