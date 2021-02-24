import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './header.scss';

const Header = ({ nextWeek, lastWeek, todayWeek, weekDates, modalWindow }) => {

    const monthFirstDayWeek = moment(weekDates[0]).format("MMMM YYYY");
    const monthLastDayWeek = moment(weekDates[weekDates.length - 1]).format("MMMM YYYY");
    const textMonth = monthFirstDayWeek === monthLastDayWeek
      ? monthFirstDayWeek
      : `${monthFirstDayWeek} - ${monthLastDayWeek}`;


    return (
        <header className="header">
            <button className="button create-event-btn" onClick={modalWindow}>
                <i className="fas fa-plus create-event-btn__icon"></i>Create
            </button>
            <div className="navigation">
                <button className="navigation__today-btn button" onClick={todayWeek}>
                    Today
                </button>
                <button className="icon-button navigation__nav-icon" onClick={lastWeek}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button className="icon-button navigation__nav-icon" onClick={nextWeek}>
                    <i className="fas fa-chevron-right"></i>
                </button>
                <span className="navigation__displayed-month">{textMonth}</span>
            </div>
        </header>
    );
};

Header.propTypes = {
    nextWeek: PropTypes.func.isRequired,
    lastWeek: PropTypes.func.isRequired,
    todayWeek: PropTypes.func.isRequired,
    weekDates: PropTypes.array.isRequired,
    modalWindow: PropTypes.func.isRequired,
  };

export default Header;