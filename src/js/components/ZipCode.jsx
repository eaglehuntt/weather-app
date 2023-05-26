import React, { useState } from 'react';

const ZipCode = ({onZipCodeSubmit}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onZipCodeSubmit(inputValue); // Pass the input value to the parent component
    // Perform further actions with the submitted value
  };

  const isInputValid = inputValue.match(/^\d{5}$/);

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange}
        pattern="\d{5}"
        placeholder="Enter 5 Digit Zip Code"
        maxLength={5}
      />
      <button type="submit" disabled={!isInputValid}>Submit</button>
    </form>
  );
};

export default ZipCode;