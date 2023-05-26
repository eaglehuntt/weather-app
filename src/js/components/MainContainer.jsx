import React, { useState } from 'react';

import ZipCode from './ZipCode.jsx';
import Forecast from './Forecast.jsx';

const MainContainer = () => {
    const [zipCode, setZipCode] = useState('');
  
    const handleZipCodeSubmit = (value) => {
      setZipCode(value);
    };
  
    return (
      <>
        {zipCode ? (
            <Forecast zipCode={zipCode} />
        ) : (
          <ZipCode onZipCodeSubmit={handleZipCodeSubmit} />
        )}
      </>
    );
  };

export default MainContainer;