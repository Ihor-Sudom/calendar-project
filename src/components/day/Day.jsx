import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Hour from '../hour/Hour';
import './day.scss';

const Day = ({ 
  dayEvents, 
  handleDeleteEvent, 
  dayStart
}) => {
    const hours = Array(24).fill().map((val, index) => index);
    const dateDayRedLine = moment(dayStart).format('MMMM DD YYYY') == moment(new Date()).format('MMMM DD YYYY');
    const dataDay = dayStart.getDate();

    return (
        <div className="calendar__day" data-day={dataDay}>

            {hours.map(hour => {
                const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

                return (
                    <Hour
                        key={dataDay + hour}
                        dataHour={hour}
                        hourEvents={hourEvents}
                        handleDeleteEvent={handleDeleteEvent}
                        dateDayRedLine={dateDayRedLine}
                    />
                )
            })}
        </div>
    );
};

Day.propTypes = {
    dayEvents: PropTypes.array.isRequired,
    handleDeleteEvent: PropTypes.func.isRequired,
    dayStart: PropTypes.instanceOf(Date).isRequired,
  };

export default Day;