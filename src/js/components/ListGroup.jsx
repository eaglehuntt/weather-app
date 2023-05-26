import React from 'react';

const ListGroup = () => {
  return (
    <>
      <button onClick={() => window.electron.notificationApi.sendNotification('This is a test!')}>click me!</button>
    </>
  );
};

export default ListGroup;