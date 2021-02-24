import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createEvent } from '../../gateway/events';
import { getDateTime } from '../../utils/dateUtils';
import './modal.scss';

const Modal = ({ modalWindow, getEventsList }) => {
  const [inputData, setInputData] = useState({
    title: '',
    date: moment(new Date()).format("YYYY-MM-DD"),
    startTime: '',
    endTime: '',
    description: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const {title, date, startTime, endTime, description} = inputData;

    const eventObject = {
      title: title,
      dateFrom: getDateTime(date, startTime),
      dateTo: getDateTime(date, endTime),
      description: description,
      statusEvent: false,
    };

    createEvent(eventObject).then(() => getEventsList());
    modalWindow();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={modalWindow}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={(e) => setInputData({...inputData, title: e.target.value})}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={inputData.date}
                onChange={(e) => setInputData({...inputData, date: e.target.value})}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={(e) => setInputData({...inputData, startTime: e.target.value})}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={(e) => setInputData({...inputData, endTime: e.target.value})}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={(e) => setInputData({...inputData, description: e.target.value})}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalWindow: PropTypes.func.isRequired,
  getEventsList: PropTypes.func.isRequired,
};

export default Modal;
