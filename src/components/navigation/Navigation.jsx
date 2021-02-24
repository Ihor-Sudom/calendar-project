import React from 'react';
import PropTypes from 'prop-types';
import { days } from '../../utils/dateUtils.js';
import moment from 'moment';
import className from 'classnames';

const Navigation = ({ dayDate }) => {
  const textStyles = moment(dayDate).format('MMMM DD YYYY') == moment(new Date()).format('MMMM DD YYYY');

  return (
    <div className="calendar__day-label day-label">
      <span className={className('day-label__day-name', {'calendar__day-today' : textStyles})}>{days[dayDate.getDay()]}</span>
      <span className={className('day-label__day-number', {'calendar__day-today' : textStyles})}>{dayDate.getDate()}</span>
    </div>
  );
};

Navigation.propTypes = {
  dayDate: PropTypes.instanceOf(Date).isRequired,
};

export default Navigation;