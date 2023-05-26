import React, { useState } from 'react';

const Forecast = ({ zipCode }) => {
  return (
    <div>
      <h1>Forecast for Zip Code: {zipCode}</h1>
    </div>
  );
};

export default Forecast;