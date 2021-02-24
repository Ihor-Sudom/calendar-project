  const baseUrl = 'https://5ff2e7d128c3980017b18ca3.mockapi.io/api/v1/Calendar';

  export const createEvent = events =>
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(events),
  });

  export const fetchEvents = () => {
    return fetch(baseUrl).then(res => {
      if (!res.ok) {
        throw new Error('Internal Server Error. Can\'t display events')
      }
      return res.json()
    }).then(events => 
      events.map(({_id, dateFrom, dateTo, ...task}) => ({
          id: _id,
          dateFrom: new Date(dateFrom),
          dateTo: new Date(dateTo),
          ... task,
        })),
    );
  };

  export const deleteEvents = id => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
      });
  }
