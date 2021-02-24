import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { fetchEvents, deleteEvents } from '../../gateway/events';
import Modal from '../modal/Modal';
import './calendar.scss';

const Calendar = ({ weekDates, modalWindow, statusModalWindow }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventsList();
  }, [weekDates]);

  const handleDeleteEvent = (id) => {
    deleteEvents(id)
      .then(() => getEventsList());
  };

  const getEventsList = () => {
    fetchEvents()
      .then(events => {
        const dataWeek = weekDates.map(el => moment(el).format('MMMM DD YYYY'));
        const newEvents = events.filter(({dateFrom}) => dataWeek.includes(moment(dateFrom).format('MMMM DD YYYY')));
        return setEvents(newEvents)
      })
      .catch(error => alert(error.message));
  };

  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <section className="calendar">
      <header className="calendar__header">
        {weekDates.map((dayDate) => (
          <Navigation 
            key={dayDate.getDay()} 
            dayDate={dayDate} />
        ))}
      </header>
      <div className="calendar__body">
        <div className="calendar__week-container">
          <div className="calendar__time-scale">
            {hours.map((hour) => (
              <Sidebar 
                key={hour} 
                hour={hour} 
              />
            ))}
          </div>
          <Week
            weekDates={weekDates}
            events={events}
            handleDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
      {statusModalWindow && (
        <Modal 
          modalWindow={modalWindow} 
          getEventsList={getEventsList} 
        />
      )}
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  statusModalWindow: PropTypes.bool,
  modalWindow: PropTypes.func.isRequired,
};

export default Calendar;
