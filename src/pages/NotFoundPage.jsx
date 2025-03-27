import React from 'react'


export const NotFoundPage = () => {

  const errorMessages = new Array(100).fill('Page Not Found 404');

  return (  
    <div>
      <img 
        src="/src/images/PageNotFoundimg.avif"
        alt="404 Not Found" 
        style={{ width: '100%', height: 'auto' }} // Adjust the size as needed
      />
      {errorMessages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};
