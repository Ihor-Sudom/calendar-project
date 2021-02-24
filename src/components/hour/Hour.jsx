import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Event from '../event/Event';

const Hour = ({ dataHour, hourEvents, handleDeleteEvent, dateDayRedLine }) => {
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0);
      setHour(hour + 1);
    }
    const interval = setInterval(() => {
      setMinutes(minutes + 1);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {dateDayRedLine && dataHour == hour 
        ? (<div style={{ top: minutes }} className="red-line"></div>) 
        : null}

      {hourEvents.map(({ id, ...hourEvent }) => {
        return (
          <Event
            key={id}
            id={id}
            {...hourEvent}
            handleDeleteEvent={handleDeleteEvent}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
  dateDayRedLine: PropTypes.bool,
};

export default Hour;
