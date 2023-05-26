import React from 'react';

const ListGroup = () => {
    const getRes = () => {
        fetch('https://www.google.com')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    return (
        <>
            <button onClick={() => getRes()}>click me!</button>
        </>
    );
};

export default ListGroup;