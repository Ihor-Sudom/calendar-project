import React from 'react';
import PropTypes from 'prop-types';
import './sidebar.scss';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Sidebar = ({ hour }) => {
  const newHour = formatMins(hour);

  return (
    <div className="time-slot">
      <span className="time-slot__time">{`${newHour}:00`}</span>
    </div>
  );
};

Sidebar.propTypes = {
  hour: PropTypes.number.isRequired,
};

export default Sidebar;
