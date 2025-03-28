import React from 'react'
import notfound from "/src/images/PageNotFoundimg.avif"

export const NotFoundPage = () => {

  const errorMessages = new Array(100).fill('Page Not Found 404');

  return (  
    <div>
      <img 
        src={notfound}
        alt="404 Not Found" 
        style={{ width: '100%', height: 'auto' }} // Adjust the size as needed
      />
      {errorMessages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};
