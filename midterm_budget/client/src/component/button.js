import React from 'react';
const Button = (props) => {
    const { onClick,btnName } = props;
    return (
      <button
        className='todo-app__view-buttons'
        onClick={()=>onClick()}
      >
          {btnName}
      </button>
    );
  };
export default Button;